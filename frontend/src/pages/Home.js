import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { useEffect } from "react";

const Home = () => {
  const { isLoggedIn, user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isLoggedIn && user?.isAdmin) {
      navigate("/admin/events", { replace: true });
    }
  }, [isLoggedIn, user, isLoading, navigate]);

  const handleServiceClick = (e, path) => {
    if (!isLoggedIn) {
      e.preventDefault();
      toast.error("Please login first to explore premium services! 🔑");
      navigate("/login");
    }
  };

  if (isLoading) return null;

  return (
    <main>
      {/* 1st Section: Premium Hero Section */}
      <section className="section-hero" style={{ background: "linear-gradient(135deg, #0b0e1a 0%, #1e1e24 100%)", padding: "10rem 2rem", color: "#fff" }}>
        <div className="container grid grid-two-cols" style={{ alignItems: "center" }}>
          <div className="hero-content">
            <span style={{ color: "#ff2b6d", fontWeight: "bold", fontSize: "1.4rem", letterSpacing: "2px", textTransform: "uppercase" }}>World Class Management</span>
            <h1 style={{ fontSize: "5.5rem", margin: "2rem 0" }}>Welcome to <span style={{ color: "#ff2b6d" }}>EventSphere</span></h1>
            <p style={{ fontSize: "1.6rem", color: "#ccc", marginBottom: "3rem", lineHeight: "1.6" }}>
              Aapke events hamari zimmedari. Hamari expert team aapke har corporate function aur seminar ko yaadgaar banane ke liye behtareen planning karti hai.
            </p>
            <div className="btn-group" style={{ display: "flex", gap: "2rem" }}>
              <Link to="/contact"><button style={{ padding: "1.5rem 3rem", background: "#ff2b6d", border: "none", color: "#fff", borderRadius: "0.8rem", cursor: "pointer", fontWeight: "bold", fontSize: "1.5rem" }}>Connect Now</button></Link>
              <Link to="/gallery"><button style={{ padding: "1.5rem 3rem", background: "transparent", border: "2px solid #ff2b6d", color: "#fff", borderRadius: "0.8rem", cursor: "pointer", fontWeight: "bold", fontSize: "1.5rem" }}>Explore Gallery</button></Link>
            </div>
          </div>
          <div className="hero-image" style={{ borderRadius: "2rem", overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }}>
            <img src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800" alt="Event" style={{ width: "100%", display: "block" }} />
          </div>
        </div>
      </section>

      {/* 2nd Section: Analytics (Updated Look) */}
      <section style={{ padding: "6rem 2rem", background: "#ff2b6d", color: "#fff" }}>
        <div className="container" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(20rem, 1fr))", gap: "3rem" }}>
          {[
            { num: "50+", label: "Registered Companies" },
            { num: "10,000+", label: "Happy Clients" },
            { num: "500+", label: "Events Managed" },
            { num: "24/7", label: "Support Available" }
          ].map((item, index) => (
            <div key={index} style={{ textAlign: "center" }}>
              <h2 style={{ fontSize: "4.5rem" }}>{item.num}</h2>
              <p style={{ fontSize: "1.3rem", textTransform: "uppercase", fontWeight: "600" }}>{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3rd Section: Premium Services (Refined Cards) */}
      <section style={{ padding: "8rem 2rem", background: "#fdfdfd" }}>
        <div className="container" style={{ textAlign: "center", marginBottom: "6rem" }}>
          <h2 style={{ fontSize: "3.5rem", color: "#333" }}>Our Premium <span style={{ color: "#ff2b6d" }}>Services</span></h2>
        </div>
        <div className="container" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "3rem" }}>
          {[
            { title: "Seminars", badge: "Knowledge", img: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg" },
            { title: "Team Building", badge: "Collaboration", img: "https://images.pexels.com/photos/3182826/pexels-photo-3182826.jpeg" },
            { title: "Trade Shows", badge: "Exposition", img: "https://images.pexels.com/photos/2182973/pexels-photo-2182973.jpeg" },
            { title: "Corporate Dinners", badge: "Gala Dinner", img: "https://images.pexels.com/photos/5638732/pexels-photo-5638732.jpeg" }
          ].map((s, i) => (
            <Link to="/gallery" key={i} onClick={(e) => handleServiceClick(e)} style={{ textDecoration: "none", background: "#fff", borderRadius: "1.5rem", overflow: "hidden", boxShadow: "0 10px 20px rgba(0,0,0,0.1)", transition: "0.4s" }}>
              <div style={{ height: "200px" }}><img src={s.img} alt={s.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>
              <div style={{ padding: "2rem" }}>
                <span style={{ fontSize: "1rem", color: "#ff2b6d", fontWeight: "bold" }}>{s.badge}</span>
                <h3 style={{ fontSize: "1.8rem", color: "#333", marginTop: "1rem" }}>{s.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;