import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Clear auth state and token
    navigate("/login"); // Redirect to login page
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Grinding Never Stops</h1>
        </Link>
        <nav>
          {isAuthenticated ? (
            <>
              <Link to="/create">
                <h4>Add Workout</h4>
              </Link>
              <button onClick={handleLogout} style={{ color: "red" }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <h4>Login</h4>
              </Link>
              <Link to="/signup">
                <h4>Signup</h4>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
