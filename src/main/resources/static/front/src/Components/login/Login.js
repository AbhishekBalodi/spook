import React, { useState } from 'react';
import './loginStyle.css';
//import AccessTypeList from '../../../public/assets/js/admin-access-type-list-script.js';

const Login = () => {
  const [error, setError] = useState(false);
  const [logout, setLogout] = useState(false);
  const [sessionExpired, setSessionExpired] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your form handling logic here
  };

  return (
    <div className="cont">
      <form action="/login" method="post" onSubmit={handleSubmit}>
        <div className="form sign-in">
          <input type="hidden" name="_csrf" value="your-csrf-token" />
          <h2>Login</h2>
          
          {error && <p className="login-page-message">Invalid username or password.</p>}
          {logout && <p className="login-page-message">You have been logged out successfully.</p>}
          {sessionExpired && <p className="login-page-message">Your session has expired. Please log in again.</p>}
          
          <label>
            <span>Email</span>
            <input type="text" name="username" required />
          </label>
          <label>
            <span>Password</span>
            <input type="password" name="password" required />
          </label>
          <button type="submit" className="submit">Sign In</button>
        </div>
      </form>
      <div className="sub-cont">
        <div className="img">
          <div className="img__text m--up">
            <h3>Welcome to the Optimizer portal. Please Login</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
