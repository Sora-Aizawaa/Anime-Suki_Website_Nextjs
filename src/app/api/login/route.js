import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";

export async function POST(request) {
  const { email, password } = await request.json();

  try {
    const connection = await mysql.createConnection({
      host: "sql12.freesqldatabase.com",
      user: "sql12785645",
      password: "nFMfH2FRqz",
      database: "sql12785645",
      port: 3306,
    });

    const [rows] = await connection.execute(
      "SELECT * FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    if (rows.length === 0) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 401,
      });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return new Response(JSON.stringify({ error: "Invalid password" }), {
        status: 401,
      });
    }

    const { password: _, ...userSafe } = user;

    return new Response(
      JSON.stringify({ message: "Login success", user: userSafe }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Login Error:", error.message);
    return new Response(
      JSON.stringify({ error: "Login failed: " + error.message }),
      {
        status: 500,
      }
    );
  }
}
