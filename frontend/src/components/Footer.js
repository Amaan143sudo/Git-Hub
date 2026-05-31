import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram, faTwitter, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer style={{ background: "#0b0e1a", color: "#fff", padding: "5rem 2rem 2rem", borderTop: "1px solid #222" }}>
      <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "3rem" }}>

        {/* Brand & Contact */}
        <div className="footer-column">
          <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Event<span style={{ color: "#ff2b6d" }}>Sphere</span></h2>
          <p style={{ color: "#888", lineHeight: "1.6" }}>Crafting unforgettable weddings and events across Pakistan and around the world.</p>
          <div style={{ marginTop: "1.5rem", color: "#ddd" }}>
            <p>📧 info@eventsphere.com</p>
            <p>📞 0321-788-8061</p>
            <p>📞 0335-788-8062</p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-column">
          <h3 style={{ marginBottom: "1.5rem" }}>Quick Links</h3>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            {["Home", "About", "Gallery", "Contact"].map(item => (
              <li key={item}>
                <NavLink 
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`} 
                  style={{ color: "#888", textDecoration: "none", transition: "0.3s" }} 
                  onMouseOver={(e) => e.target.style.color = "#ff2b6d"} 
                  onMouseOut={(e) => e.target.style.color = "#888"}
                >
                  {item}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Updated Services */}
        <div className="footer-column">
          <h3 style={{ marginBottom: "1.5rem" }}>Our Premium Services</h3>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.8rem", color: "#888" }}>
            <li>✨ Seminars Planning</li>
            <li>🤝 Team Building Events</li>
            <li>📢 Trade Shows and Expos</li>
            <li>🍽️ Corporate Dinners</li>
            <li>💍 Bespoke Wedding Planning</li>
          </ul>
        </div>

        {/* Locations */}
        <div className="footer-column">
          <h3 style={{ marginBottom: "1.5rem" }}>Where We Serve</h3>
          <p style={{ color: "#888" }}>Creating magic from Pakistan to the world.</p>
          <div style={{ display: "flex", gap: "1rem", marginTop: "1rem", color: "#ff2b6d" }}>
            <span>Karachi</span> | <span>Lahore</span> | <span>Islamabad</span> | <span>Global</span>
          </div>
        </div>
      </div>

      {/* Bottom Socials */}
      <div style={{ textAlign: "center", marginTop: "4rem", paddingTop: "2rem", borderTop: "1px solid #222" }}>
        <div className="footer-social" style={{ display: "flex", justifyContent: "center", gap: "2rem", fontSize: "1.5rem", marginBottom: "1.5rem" }}>
          
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" style={{ color: "#fff", transition: "0.3s" }} onMouseOver={(e) => e.target.style.color = "#ff2b6d"} onMouseOut={(e) => e.target.style.color = "#fff"}>
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" style={{ color: "#fff", transition: "0.3s" }} onMouseOver={(e) => e.target.style.color = "#ff2b6d"} onMouseOut={(e) => e.target.style.color = "#fff"}>
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" style={{ color: "#fff", transition: "0.3s" }} onMouseOver={(e) => e.target.style.color = "#ff2b6d"} onMouseOut={(e) => e.target.style.color = "#fff"}>
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="https://web.whatsapp.com/" target="_blank" rel="noopener noreferrer" style={{ color: "#fff", transition: "0.3s" }} onMouseOver={(e) => e.target.style.color = "#ff2b6d"} onMouseOut={(e) => e.target.style.color = "#fff"}>
            <FontAwesomeIcon icon={faWhatsapp} />
          </a>

        </div>
        <p style={{ color: "#444", fontSize: "0.9rem" }}>© {new Date().getFullYear()} EventSphere. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;