import React from 'react'
import './Login.css';

const Login = () => {
  return (
    <>
    <div className="container">
      <div className="login-container">
        <h2>Jump back in the flow. <br />Log in.</h2>
        <form>
          <div className="form-group">
            <input placeholder="Email" type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <input placeholder="Password" type="password" id="password" name="password" required />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        <a href="/register">Don't have an account? Sign up here.</a>
      </div>
    
    </div>
    </>
  )
}

export default Login