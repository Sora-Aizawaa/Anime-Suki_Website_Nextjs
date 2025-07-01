"use client";

import { useState } from "react";
import "./page.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [alertShown, setAlertShown] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "" });

  const router = useRouter();

  const handleEmailFocus = () => {
    if (!alertShown) {
      alert(
        "🔓 Sign in to unlock full anime details, search your favorite anime, and watch them episode by episode just type it in the search bar!"
      );
      setAlertShown(true);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error messages
    setEmailError("");
    setPasswordError("");
    let valid = true;

    const { email, password } = formData;

    // ✅ Email must be a valid Gmail address
    if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email)) {
      setEmailError(
        "Email must be a valid gmail address, you need use @gmail.com (e.g., example@gmail.com)."
      );
      valid = false;
    }

    // ✅ Password must be at least 5 characters
    // if (password.length < 5) {
    //   setPasswordError("Password must be at least 5 characters long.");
    //   valid = false;
    // }

    // // ✅ Password must include at least one uppercase letter
    // if (!/[A-Z]/.test(password)) {
    //   setPasswordError("Password must include at least one uppercase letter.");
    //   valid = false;
    // }

    if (!valid) return;

    // ✅ Kirim request login
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        router.push("/home");
      } else {
        alert(data.error || "Login failed");
      }
    } catch (err) {
      alert("Something went wrong. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-form">
          <h2 className="login-title">Login</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={handleEmailFocus}
                placeholder="Enter your email..."
                required
              />
              {emailError && <p className="error-text">{emailError}</p>}
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password..."
                required
              />
              {passwordError && <p className="error-text">{passwordError}</p>}
            </div>

            <div className="login-options">
              <a href="#">Forgot password?</a>
            </div>

            <div className="login-options">
              <a href="/">Back To Home</a>
            </div>

            <p className="login-text2">
              Don't have an account?{" "}
              <Link href="/signup" className="signup-link1">
                Signup
              </Link>
            </p>
            <button type="submit" className="login-button-1">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
