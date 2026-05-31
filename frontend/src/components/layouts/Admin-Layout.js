import { NavLink, Outlet, Navigate } from "react-router-dom";
// 🟢 FaClipboardList import kiya
import { FaUser, FaEnvelope, FaCalendarAlt, FaChartLine, FaSignOutAlt, FaClipboardList } from "react-icons/fa";
import { useAuth } from "../../store/auth";

const AdminLayout = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div style={{ color: "#fff", textAlign: "center", marginTop: "20%" }}>Loading Dashboard...</div>;
  if (!user?.isAdmin) return <Navigate to="/" />;

  const navLinks = [
    { to: "/admin/dashboard", icon: <FaChartLine />, label: "Dashboard" },
    { to: "/admin/users", icon: <FaUser />, label: "Users" },
    { to: "/admin/contacts", icon: <FaEnvelope />, label: "Messages" },
    { to: "/admin/events", icon: <FaCalendarAlt />, label: "Events" },
    // 🟢 Naya link yahan add kiya
    { to: "/admin/registrations", icon: <FaClipboardList />, label: "Registrations" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#060814", color: "#fff" }}>
      {/* Sidebar */}
      <aside style={{ width: "280px", background: "rgba(19, 24, 46, 0.6)", backdropFilter: "blur(20px)", padding: "2rem", borderRight: "1px solid rgba(255, 255, 255, 0.1)" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "3rem", color: "#ff2b6d" }}>EventSphere Admin</h2>
        
        <nav style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {navLinks.map((item) => (
            <NavLink 
              key={item.to} to={item.to} 
              style={({ isActive }) => ({
                padding: "1rem", borderRadius: "0.8rem", textDecoration: "none",
                display: "flex", alignItems: "center", gap: "1rem", transition: "0.3s",
                background: isActive ? "#ff2b6d" : "transparent", color: "#fff"
              })}
            >
              {item.icon} {item.label}
            </NavLink>
          ))}
          
          <div style={{ marginTop: "auto", paddingTop: "2rem", borderTop: "1px solid #222", display: "flex", flexDirection: "column", gap: "1rem" }}>  
            <NavLink to="/logout" style={{ color: "#ff4d4d", textDecoration: "none", display: "flex", alignItems: "center", gap: "1rem" }}>
              <FaSignOutAlt /> Logout
            </NavLink>
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: "3rem", background: "radial-gradient(circle at top right, #13182e, #060814)" }}>
        <div style={{ background: "rgba(255,255,255,0.03)", padding: "2rem", borderRadius: "2rem", border: "1px solid rgba(255,255,255,0.05)", minHeight: "80vh" }}>
          <Outlet /> 
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;