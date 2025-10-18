import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("studentId");
    Cookies.remove("fullName");
    Cookies.remove("email");

    navigate("/login");
  };

  const isActive = (path) => (location.pathname === path ? "active" : "");

  return (
    <nav className="navbar">
      <div className="navbar-logo">Dashboard</div>
      <ul className="navbar-links">
        <li>
          <Link to="/profile" className={isActive("/profile")}>
            Profile
          </Link>
        </li>
        <li>
          <Link to="/topics" className={isActive("/topics")}>
            Topics
          </Link>
        </li>
        <li>
          <Link to="/progress" className={isActive("/progress")}>
            Progress
          </Link>
        </li>
        <li>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
