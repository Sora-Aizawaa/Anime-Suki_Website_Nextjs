"use client";

import "./page.css";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("user", JSON.stringify(data.user)); // Simpan session
      router.push("/home"); // ✅ Redirect ke halaman /home
    } else {
      alert(data.error);
    }
  };
  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <p className="login-text">
        🔓 Sign in to unlock full anime details, search your favorite anime, and
        watch them episode by episode just type it in the search bar!
      </p>

      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
      <p className="login-text1">
        You don't have an account?{" "}
        <Link href="/signup" className="signup-link-blue">
          Signup
        </Link>
      </p>
    </div>
  );
}
