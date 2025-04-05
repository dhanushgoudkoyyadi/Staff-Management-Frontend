import React from "react";

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useLoginMutation } from "../../service/leads";



const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [login, { isLoading, error }] = useLoginMutation()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert("Passwords do not match. Please try again.")
      return
    }
    try {
      const response = await login({ username, password }).unwrap()
      localStorage.setItem("token", response.token)
      navigate("/Dashboard")
    } catch (err) {
      console.error("Login error:", err)
    }
  }

  return (
    <div className="user-login-container">
      <div className="user-login-card">
        <div className="user-login-form-section">
          <h1 className="user-login-title">Welcome Back</h1>
          <form onSubmit={handleSubmit} className="user-login-form">
            <div className="user-login-form-group">
              <label htmlFor="username" className="user-login-label">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="user-login-input"
              />
            </div>
            <div className="user-login-form-group">
              <label htmlFor="password" className="user-login-label">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="user-login-input"
              />
            </div>
            <div className="user-login-form-group">
              <label htmlFor="confirmPassword" className="user-login-label">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="user-login-input"
              />
            </div>
            <button type="submit" disabled={isLoading} className="user-login-button">
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
          {error && <p className="user-login-error">{error.data?.message || "An error occurred. Please try again."}</p>}
        </div>

        
      </div>
    </div>
  )
}

export default Login

