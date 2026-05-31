import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const Gallery = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [events, setEvents] = useState([]);

  const getEvents = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/events", {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  const handleCardClick = (id) => {
    if (isLoggedIn) {
      navigate(`/event-details/${id}`);
    } else {
      toast.warn("Please login first to view details!");
      navigate("/login");
    }
  };

  return (
    <section style={{ background: "#0f172a", padding: "80px 0", minHeight: "100vh" }}>
      <div className="container" style={{ textAlign: "center", marginBottom: "60px" }}>
        <h1 style={{ fontSize: "3.5rem", fontWeight: "700", color: "#ffffff", marginBottom: "1rem" }}>
          Our Corporate Event <span style={{ color: "#6366f1" }}>Services:</span>
        </h1>
      </div>

      {/* Grid container */}
      <div className="container gallery-grid">
        {events.length > 0 ? (
          events.map((event) => {
            const imageUrl = event.image 
              ? (event.image.startsWith("uploads") ? `http://localhost:8000/${event.image}` : `http://localhost:8000/uploads/${event.image}`)
              : "https://via.placeholder.com/400x200?text=No+Image";

            return (
              <div
                key={event._id}
                className="card"
                onClick={() => handleCardClick(event._id)}
                style={{ cursor: "pointer" }}
              >
                {/* Image Wrapper */}
                <div className="event-image-wrapper">
                  <img
                    src={imageUrl}
                    alt={event.title}
                    onError={(e) => { e.target.src = "https://via.placeholder.com/400x200?text=Image+Not+Found"; }}
                  />
                </div>

                {/* Content */}
                <div style={{ padding: "20px" }}>
                  <h2 className="text-truncate" style={{ fontSize: "1.8rem", color: "#ff4757", marginBottom: "15px" }}>
                    {event.title}
                  </h2>
                  
                  {/* Event Details Section */}
                  <div style={{ fontSize: "1.3rem", color: "#a4b0be", marginBottom: "20px", lineHeight: "1.8" }}>
                    <p>📅 <strong>Date:</strong> {event.date ? new Date(event.date).toLocaleDateString() : "TBA"}</p>
                    <p>📍 <strong>Location:</strong> {event.location || "N/A"}</p>
                    <p>🏢 <strong>Venue:</strong> {event.venue || "TBA"}</p>
                    <p>🏷️ <strong>Category:</strong> {event.category || "General"}</p>
                  </div>
                  
                  <button style={{ 
                    width: "100%", 
                    background: "#ff4757", 
                    color: "#ffffff", 
                    border: "none", 
                    padding: "12px", 
                    borderRadius: "6px", 
                    cursor: "pointer", 
                    fontWeight: "bold", 
                    fontSize: "1.4rem",
                    transition: "0.3s" 
                  }}>
                    View Details →
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p style={{ color: "#fff", textAlign: "center", gridColumn: "1/-1", fontSize: "1.6rem" }}>No events available yet.</p>
        )}
      </div>
    </section>
  );
};

export default Gallery;