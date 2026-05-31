import { Link } from "react-router-dom";

const About = () => {
  return (
    <main style={{ backgroundColor: "#0b0e1a", color: "#fff", minHeight: "100vh" }}>
      
      {/* 1st Section: Premium Hero Section */}
      <section style={{ padding: "10rem 2rem", background: "linear-gradient(135deg, #0b0e1a 0%, #171c33 100%)" }}>
        <div className="container grid grid-two-cols" style={{ alignItems: "center", gap: "5rem" }}>
          <div className="hero-content">
            <span style={{ color: "#ff2b6d", fontWeight: "700", textTransform: "uppercase", letterSpacing: "3px", fontSize: "1.2rem" }}>Who We Are</span>
            <h1 style={{ fontSize: "4.5rem", margin: "2rem 0" }}>Crafting Excellence <br /> with <span style={{ color: "#ff2b6d" }}>EventSphere</span></h1>
            <p style={{ fontSize: "1.6rem", color: "#ccc", lineHeight: "1.8" }}>
              We are a premier global event management company. From luxury weddings to high-end corporate conferences, hamari expert team har function ko perfection aur flawless execution ke sath yaadgaar banati hai.
            </p>
            <div className="btn-group" style={{ marginTop: "4rem", display: "flex", gap: "2rem" }}>
              <Link to="/contact"><button style={{ padding: "1.5rem 3rem", background: "#ff2b6d", border: "none", color: "#fff", borderRadius: "0.8rem", cursor: "pointer", fontWeight: "bold" }}>Connect Now</button></Link>
              <Link to="/gallery"><button style={{ padding: "1.5rem 3rem", background: "transparent", border: "2px solid #ff2b6d", color: "#fff", borderRadius: "0.8rem", cursor: "pointer", fontWeight: "bold" }}>View Gallery</button></Link>
            </div>
          </div>
          <div className="hero-image" style={{ position: "relative" }}>
            <img src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg" alt="Team" style={{ borderRadius: "2rem", width: "100%", boxShadow: "0 25px 50px rgba(0,0,0,0.5)" }} />
            <div style={{ position: "absolute", bottom: "-30px", left: "-30px", background: "#ff2b6d", padding: "2rem", borderRadius: "1rem" }}>
              <h3 style={{ fontSize: "2rem", margin: 0 }}>10+ Years</h3>
              <p style={{ fontSize: "1.2rem", margin: 0 }}>Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2nd Section: Why Choose Us (Refined Cards) */}
      <section style={{ padding: "10rem 2rem", backgroundColor: "#0f1326" }}>
        <div className="container" style={{ textAlign: "center", marginBottom: "7rem" }}>
          <h2 style={{ fontSize: "3.5rem" }}>Why Choose <span style={{ color: "#ff2b6d" }}>EventSphere?</span></h2>
        </div>

        <div className="container" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "3rem" }}>
          {[
            { icon: "✨", title: "Bespoke Concepts", desc: "Har event ka unique layout design kiya jata hai jo aapke signature style se perfect match kare." },
            { icon: "🤝", title: "End-to-End Management", desc: "Venue selection, high-end lighting, and flawless coordination handled by our pros." },
            { icon: "🌍", title: "Global Network", desc: "From major cities across Pakistan to luxury destinations worldwide—we serve you everywhere." }
          ].map((card, i) => (
            <div key={i} style={{ background: "#181d33", padding: "4rem 3rem", borderRadius: "2rem", border: "1px solid #2a3252", transition: "0.4s", cursor: "pointer" }} 
                 onMouseEnter={(e) => e.currentTarget.style.borderColor = "#ff2b6d"} 
                 onMouseLeave={(e) => e.currentTarget.style.borderColor = "#2a3252"}>
              <div style={{ fontSize: "4rem", marginBottom: "2rem" }}>{card.icon}</div>
              <h3 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>{card.title}</h3>
              <p style={{ color: "#aaa", fontSize: "1.4rem", lineHeight: "1.6" }}>{card.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default About;