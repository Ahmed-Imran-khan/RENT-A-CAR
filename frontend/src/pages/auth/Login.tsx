import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data.token);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#1a1a2e",
      }}
    >
      <div
        style={{
          background: "#16213e",
          padding: "2rem",
          borderRadius: "10px",
          width: "350px",
        }}
      >
        <h2
          style={{
            color: "#e94560",
            textAlign: "center",
            marginBottom: "1.5rem",
          }}
        >
          Rent-A-Car
        </h2>
        <h3
          style={{
            color: "white",
            textAlign: "center",
            marginBottom: "1.5rem",
          }}
        >
          Admin Login
        </h3>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "0.75rem",
            marginBottom: "1rem",
            borderRadius: "5px",
            border: "none",
            boxSizing: "border-box",
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "0.75rem",
            marginBottom: "1rem",
            borderRadius: "5px",
            border: "none",
            boxSizing: "border-box",
          }}
        />
        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "0.75rem",
            background: "#e94560",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
