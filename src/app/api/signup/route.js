import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";

export async function POST(request) {
  const body = await request.json();
  const { username, email, password, confirmPassword } = body;

  if (password !== confirmPassword) {
    return new Response(JSON.stringify({ error: "Password mismatch" }), {
      status: 400,
    });
  }

  try {
    // Enkripsi password pakai bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Koneksi ke database
    const connection = await mysql.createConnection({
      host: "sql12.freesqldatabase.com",
      user: "sql12785645",
      password: "nFMfH2FRqz",
      database: "sql12785645",
      port: 3306,
    });

    // Simpan data ke database
    const query =
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    await connection.execute(query, [username, email, hashedPassword]);

    return new Response(JSON.stringify({ message: "Signup success" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Signup Error:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
