import React, { useState } from 'react';
import "../App.css";

// ✔ Email: contact@alphabuilders.com

// Password: hashed_pw_123

// ✔ Email: info@betamfg.com

// Password: hashed_pw_456

// ✔ Email: support@gammaretail.com

// Password: hashed_pw_789

// login component

function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // const endpoint = isLogin ? "/api/login" : "/api/register";

    const endpoint = "http://localhost:4000/auth/login";

    const payload = isLogin ? {email, password} : {companyName, email, password};

    const res = await fetch(endpoint, {
      method:"POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    console.log("FE CLIENT LOGIN RESPONSE:", data);

    if (res.ok){
      alert("success");
      if (isLogin) window.location.href= "/dashboard"
    } else{
      alert(data.error || "Something went wrong");
    }
  }

  return (
    <form className="LoginContainer" onSubmit={handleSubmit}>
    <div className="LoginContainer">
      <div className="LoginToggle">
        <button
          className={`ToggleButton ${isLogin ? "active" : ""}`}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button
          className={`ToggleButton ${!isLogin ? "active" : ""}`}
          onClick={() => setIsLogin(false)}
        >
          Register
        </button>
      </div>

      {isLogin ? (
        <div className="Form LoginForm">
          <div className="LoginFormContent">
            <label>Email</label>
            <input type="email" placeholder="name@company.com" onChange={(e) => setEmail(e.target.value)} required />
            <label>Password</label>
            <input type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)}     required />
            <button type="submit" className="SignInButton">
              Sign in
            </button>
          </div>
        </div>
      ) : (
        <div className="Form RegisterForm">
          <div className="LoginFormContent">
            <label>Company Name</label>
            <input type="text" placeholder="Your company inc." onChange={(e) => setCompanyName(e.target.value)} required />
            <label>Email</label>
            <input type="email" placeholder="name@company.com" onChange={(e) => setEmail(e.target.value)} required />
            <label>Password</label>
            <input type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit" className="SignInButton">
              Create account
            </button>
          </div>
        </div>
      )}

    </div>
    </form>
  );
}

export default LoginForm;
