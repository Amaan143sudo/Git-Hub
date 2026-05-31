import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [user, setUser] = useState({ username: "", email: "", phone: "", password: "" });
  const navigate = useNavigate();

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const res_data = await response.json();
      if (response.ok) {
        toast.success("Registration successful! Welcome to EventSphere.");
        setUser({ username: "", email: "", phone: "", password: "" });
        navigate("/login");
      } else {
        toast.error(res_data.extraDetails || res_data.message);
      }
    } catch (error) {
      console.error("register error", error);
    }
  };

  return (
    <section style={{ padding: "8rem 2rem", background: "#0b0e1a", color: "#fff", minHeight: "100vh" }}>
      <div className="container" style={{ 
        maxWidth: "1100px", 
        margin: "0 auto", 
        display: "grid", 
        gridTemplateColumns: "1fr 1fr", 
        gap: "4rem", 
        alignItems: "stretch" 
      }}>
        
<img 
  src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200" 
  alt="Digital Registration" 
  style={{ 
    width: "100%", 
    height: "100%", 
    objectFit: "cover", 
    display: "block" 
  }} 
/>

        {/* Right Side: Form */}
        <div style={{ background: "#13182e", padding: "4rem", borderRadius: "2rem", border: "1px solid #222" }}>
          <h1 style={{ fontSize: "3rem", marginBottom: "2rem" }}>Create <span style={{ color: "#ff2b6d" }}>Account</span></h1>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {["username", "email", "phone", "password"].map((field) => (
              <div key={field} style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ fontSize: "1.3rem", marginBottom: "0.8rem", textTransform: "capitalize", color: "#ddd" }}>{field}</label>
                <input 
                  type={field === "password" ? "password" : field === "phone" ? "number" : "text"} 
                  name={field} 
                  placeholder={`Enter your ${field}`} 
                  value={user[field]} 
                  onChange={handleInput} 
                  required 
                  style={{ 
                    background: "#0b0e1a", border: "1px solid #333", padding: "1.5rem", borderRadius: "1rem", color: "#fff", outline: "none", width: "100%"
                  }}
                />
              </div>
            ))}
            <button type="submit" style={{ marginTop: "1rem", padding: "1.5rem", background: "#ff2b6d", border: "none", color: "#fff", borderRadius: "1rem", cursor: "pointer", fontWeight: "bold", fontSize: "1.6rem" }}>
              Register Now 🚀
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;