import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth";

const UpcomingEvents = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [events] = useState([
    { id: 1, title: "TechX Expo 2026", category: "Exhibition", date: "2026-07-15", venue: "Expo Center, Karachi", image: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=600", description: "Pakistan's biggest IT summit.", status: "Registration Open" },
    { id: 2, title: "Grand Corporate Awards", category: "Corporate Event", date: "2026-08-05", venue: "PC Hotel, Lahore", image: "https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=600", description: "An elite annual corporate meetup.", status: "Invites Only" },
    { id: 3, title: "Sufi Symphony Night", category: "Concert", date: "2026-09-20", venue: "Movenpick, Karachi", image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=600", description: "A soul-stirring live musical evening.", status: "Selling Fast" },
    { id: 4, title: "Global Fashion & Craft Hub", category: "Exhibition", date: "2026-10-10", venue: "Marriott, Islamabad", image: "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=600", description: "Traditional values meets modern style.", status: "Coming Soon" },
  ]);

  const [activeFilter, setActiveFilter] = useState("All");

  const filteredEvents = activeFilter === "All" ? events : events.filter((item) => item.category === activeFilter);

  const handleRegistration = async (eventTitle) => {
    if (!isLoggedIn) {
      toast.error("Please log in first to register! 🔑");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/events/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ eventTitle }),
      });

      if (response.ok) {
        toast.success(`🎉 Registered for ${eventTitle} successfully!`);
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } catch (error) {
      toast.error("Server error, try later.");
    }
  };

  return (
    <section style={{ padding: "6rem 2rem", background: "#0b0e1a", color: "#fff", minHeight: "100vh" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <h2 style={{ fontSize: "3.5rem", color: "#ff2b6d", textTransform: "uppercase", marginBottom: "1rem" }}>Upcoming Events Hub</h2>
          <p style={{ color: "#8b949e", fontSize: "1.6rem" }}>Discover and register for the latest events happening near you.</p>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "4rem", flexWrap: "wrap" }}>
          {["All", "Corporate Event", "Concert", "Exhibition"].map((cat) => (
            <button 
              key={cat} 
              onClick={() => setActiveFilter(cat)} 
              style={{ 
                padding: "1rem 2.5rem", background: activeFilter === cat ? "#ff2b6d" : "#1e2436", 
                color: "#fff", borderRadius: "5rem", border: "none", cursor: "pointer", 
                transition: "0.3s", fontWeight: "600" 
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid using CSS Classes */}
        <div className="gallery-grid">
          {filteredEvents.map((item) => (
            <div key={item.id} className="card">
              <div className="event-image-wrapper">
                <img src={item.image} alt={item.title} />
              </div>
              <div style={{ padding: "2rem" }}>
                <span style={{ fontSize: "1.2rem", color: "#ff2b6d", fontWeight: "700", textTransform: "uppercase" }}>
                  {item.status}
                </span>
                <h3 className="text-truncate" style={{ fontSize: "1.8rem", margin: "0.8rem 0" }}>{item.title}</h3>
                <p style={{ fontSize: "1.3rem", color: "#8b949e", marginBottom: "1rem" }}>📅 {item.date} | 📍 {item.venue}</p>
                <p className="desc-truncate" style={{ marginBottom: "2rem" }}>{item.description}</p>
                
                <button 
                  onClick={() => handleRegistration(item.title)} 
                  style={{ width: "100%", padding: "1.2rem", background: "#ff2b6d", color: "#fff", border: "none", borderRadius: "0.8rem", cursor: "pointer", fontWeight: "600", fontSize: "1.4rem" }}
                >
                  Confirm Registration 🔔
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;