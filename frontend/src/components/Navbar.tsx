import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      style={{
        background: "#1a1a2e",
        padding: "1rem 2rem",
        display: "flex",
        gap: "2rem",
        alignItems: "center",
      }}
    >
      <span
        style={{ color: "#e94560", fontWeight: "bold", fontSize: "1.2rem" }}
      >
        🚗 Rent-A-Car
      </span>
      <Link to="/" style={{ color: "white", textDecoration: "none" }}>
        Dashboard
      </Link>
      <Link to="/customers" style={{ color: "white", textDecoration: "none" }}>
        Customers
      </Link>
      <Link to="/vehicles" style={{ color: "white", textDecoration: "none" }}>
        Vehicles
      </Link>
      <Link to="/bookings" style={{ color: "white", textDecoration: "none" }}>
        Bookings
      </Link>
      <button
        onClick={handleLogout}
        style={{
          marginLeft: "auto",
          background: "#e94560",
          color: "white",
          border: "none",
          padding: "0.5rem 1rem",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
