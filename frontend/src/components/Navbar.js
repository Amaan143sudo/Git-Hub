import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { FaArrowLeft, FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();

  // Helper for NavLink active styling
  const getLinkStyle = ({ isActive }) => ({
    color: isActive ? "#ff2b6d" : "#fff",
    textDecoration: "none",
    padding: "0.5rem 1rem",
    transition: "all 0.3s ease",
    fontWeight: isActive ? "bold" : "normal",
    borderBottom: isActive ? "2px solid #ff2b6d" : "2px solid transparent"
  });

  return (
    <header style={{ 
      padding: "1.2rem 0", background: "#0b0e1a", 
      borderBottom: "1px solid #222", position: "sticky", top: 0, zIndex: 1000 
    }}>
      <div className="container" style={{ 
        display: "flex", justifyContent: "space-between", alignItems: "center", 
        maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" 
      }}>
        
        {/* Left: Branding & Back Navigation */}
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <button 
            onClick={() => navigate(-1)} 
            style={{ 
              background: "#13182e", border: "1px solid #333", color: "#fff", 
              padding: "0.6rem 1rem", borderRadius: "0.8rem", cursor: "pointer", transition: "0.3s" 
            }}
            onMouseOver={(e) => e.target.style.borderColor = "#ff2b6d"}
            onMouseOut={(e) => e.target.style.borderColor = "#333"}
          >
            <FaArrowLeft />
          </button>
          
          <NavLink to="/" style={{ color: "#fff", fontSize: "2.2rem", fontWeight: "800", textDecoration: "none" }}>
            Event<span style={{ color: "#ff2b6d" }}>Sphere</span>
          </NavLink>
        </div>

        {/* Right: Navigation Links */}
        <nav>
          <ul style={{ display: "flex", gap: "1rem", listStyle: "none", alignItems: "center" }}>
            {isLoggedIn && user?.isAdmin ? (
              <>
                <li><NavLink to="/admin" style={getLinkStyle}>Admin Panel</NavLink></li>
                <li><NavLink to="/logout" style={{...getLinkStyle({isActive: false}), color: "#ff2b6d"}}><FaSignOutAlt /> Logout</NavLink></li>
              </>
            ) : (
              <>
                <li><NavLink to="/" style={getLinkStyle}>Home</NavLink></li>
                <li><NavLink to="/about" style={getLinkStyle}>About</NavLink></li>
                <li><NavLink to="/gallery" style={getLinkStyle}>Gallery</NavLink></li>
                
                {/* 🟢 Upcoming Events Link Added */}
                <li><NavLink to="/upcoming-events" style={getLinkStyle}>Upcoming</NavLink></li>
                
                <li><NavLink to="/contact" style={getLinkStyle}>Contact</NavLink></li>
                
                {isLoggedIn ? (
                  <li style={{ display: "flex", alignItems: "center", gap: "1rem", marginLeft: "1rem" }}>
                    <span style={{ color: "#aaa", fontSize: "0.9rem" }}>Hi, {user?.username}</span>
                    <NavLink to="/logout" style={getLinkStyle}><FaSignOutAlt /> Logout</NavLink>
                  </li>
                ) : (
                  <>
                    <li><NavLink to="/register" style={getLinkStyle}>Register</NavLink></li>
                    <li><NavLink to="/login" style={getLinkStyle}>Login</NavLink></li>
                  </>
                )}
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;