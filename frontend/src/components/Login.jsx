import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Demo users
  const users = [
    { email: "student@gmail.com", password: "1234", role: "student" },
    { email: "supervisor@gmail.com", password: "1234", role: "supervisor" },
    { email: "admin@gmail.com", password: "1234", role: "admin" }
  ];

  const handleLogin = (e) => {
    e.preventDefault();

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      alert(`Login successful as ${user.role}`);

      // Redirect based on role
      if (user.role === "student") {
        navigate("/student");
      } else if (user.role === "supervisor") {
        navigate("/supervisor");
      } else {
        navigate("/admin");
      }
    } else {
      alert("Invalid email or password");
    }
  };

return (
  <div>


    <div style={styles.container}>
      <h2>EMS</h2>
      <h1>Welcome Back</h1>
      <p>Sign in to your account</p>

      <form onSubmit={handleLogin} style={styles.form}>
        
        <label>Email Address</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Login
        </button>

        <p style={{ marginTop: "10px" }}>
          Demo:
          <br />
          student@gmail.com / 1234
          <br />
          supervisor@gmail.com / 1234
          <br />
          admin@gmail.com / 1234
        </p>

      </form>
    </div>

  </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    background: "#f5f5f5"
  },
  form: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    width: "300px",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc"
  },
  button: {
    padding: "10px",
    background: "#000",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }
};

export default Login;