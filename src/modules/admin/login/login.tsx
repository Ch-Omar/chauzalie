"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; 
import '@/styles/admin.scss'

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      localStorage.setItem("isAdmin", "true");
      router.push("/admin/products"); 
      setError("");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <div className="card-login">
        <h3 className="text-center mb-4">Admin Login</h3>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <button type="submit" className="btn btn-login w-100 mt-3">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}