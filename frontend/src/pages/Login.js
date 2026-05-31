import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { storeTokenInLS, userAuthentication, user: authUser } = useAuth();

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const res_data = await response.json();

      if (response.ok) {
        storeTokenInLS(res_data.token);
        const userData = await userAuthentication();
        setUser({ email: "", password: "" });
        toast.success("Login successful! 🎉");
        
        const isAdmin = userData?.isAdmin || authUser?.isAdmin;
        if (isAdmin) { navigate("/admin"); } else { navigate("/"); }
      } else {
        toast.error(res_data.msg || res_data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Server connection error!");
    }
  };

  return (
    <section style={{ padding: "8rem 2rem", background: "#0b0e1a", color: "#fff", minHeight: "100vh" }}>
      <div className="container" style={{ 
        maxWidth: "1100px", margin: "0 auto", display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", 
        gap: "6rem", alignItems: "center" 
      }}>
        
        {/* Left Side: Modern Laptop Mockup Image */}
        <div style={{ borderRadius: "2rem", overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }}>
          <img
            src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=1000"
            alt="Login to EventSphere"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>

        {/* Right Side: Glassmorphism Form */}
        <div style={{ 
          background: "rgba(19, 24, 46, 0.7)", 
          backdropFilter: "blur(10px)", 
          padding: "4rem", 
          borderRadius: "2rem", 
          border: "1px solid rgba(255, 255, 255, 0.1)" 
        }}>
          <h1 style={{ fontSize: "3rem", marginBottom: "2rem" }}>Login <span style={{ color: "#ff2b6d" }}>Account</span></h1>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem" }}>Email Address</label>
              <input
                type="email" name="email" placeholder="Enter your email" required
                value={user.email} onChange={handleInput}
                style={{ width: "100%", padding: "1.2rem", borderRadius: "1rem", background: "#0b0e1a", border: "1px solid #333", color: "#fff", outline: "none" }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem" }}>Password</label>
              <input
                type="password" name="password" placeholder="Enter your password" required
                value={user.password} onChange={handleInput}
                style={{ width: "100%", padding: "1.2rem", borderRadius: "1rem", background: "#0b0e1a", border: "1px solid #333", color: "#fff", outline: "none" }}
              />
            </div>
            <button type="submit" style={{ 
              marginTop: "1rem", padding: "1.5rem", background: "#ff2b6d", 
              border: "none", color: "#fff", borderRadius: "1rem", cursor: "pointer", 
              fontWeight: "bold", fontSize: "1.5rem" 
            }}>
              Login Now 🚀
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;