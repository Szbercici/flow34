import React from 'react'
import './Register.css';

const Register = () => {
  return (
    <>
    <div className="container">
      <div className="register-container">
        <h2>Join the flow. <br /> Create your account.</h2>
        <form>
          <div className="form-group">
            <input placeholder="Username" type="text" id="username" name="username" required />
          </div>
          <div className="form-group">
            <input placeholder="Email" type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <input placeholder="Password" type="password" id="password" name="password" required />
          </div>
          <div className="form-group">
            <input placeholder="Password again" type="password" id="password_again" name="password_again" required />
          </div>

          <button type="submit" className="register-button">Register</button>
        </form>
        <a href="/login">Already have an account? Log in here.</a>
      </div>
    </div>
    </>
   
  )
}

export default Register