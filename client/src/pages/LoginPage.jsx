import React, { useState } from "react";
import "../styles/Login.scss"
import { setLogin } from "../redux/state";
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch ("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      })
      if (!response.ok) { // Kiểm tra nếu response không thành công
        const errorResponse = await response.json();
        setError(errorResponse.message); // Lưu thông báo lỗi từ backend
        return; // Dừng lại để không dispatch và điều hướng
      } else {
          /* Get data after fetching */
      const loggedIn = await response.json()

      if (loggedIn) {
        dispatch (
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token
          })
        )
        navigate("/")
      } 
      }   
    } catch (err) {
      console.log("Login failed", err.message)
   
    }
  }

  return (
    <div className="login">
      <div className="login_content">
        <form className="login_content_form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p style={{color:"red"}}>{error}</p>} 
          <button type="submit">Đăng Nhập</button>
        </form>
        
        <a href="/register">Chưa có tài khoản? Đăng kí ngay</a>
      </div>
    </div>
  );
};

export default LoginPage;
