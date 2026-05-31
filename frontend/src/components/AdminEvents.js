import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  // 1. Backend se saare events fetch karna
  const getAllEvents = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/events", {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      } else {
        toast.error("Failed to load events");
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // 2. Event Delete karna
  const deleteEvent = async (id) => {
    if (!window.confirm("Kya aap sach mein ye event delete karna chahte hain?")) return;

    try {
      const response = await fetch(`http://localhost:8000/api/events/delete/event/${id}`, {
        method: "DELETE",
        headers: { 
          "Authorization": `Bearer ${localStorage.getItem("token")}` 
        },
      });

      if (response.ok) {
        toast.success("Event Deleted Successfully!");
        // UI se delete karein
        setEvents(events.filter((event) => event._id !== id));
      } else {
        toast.error("Failed to delete event");
      }
    } catch (error) {
      toast.error("Server Error: Unable to delete");
    }
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  return (
    <div style={{ padding: "2rem", color: "#fff", maxWidth: "900px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "2rem" }}>MANAGE EVENTS</h2>
        <button 
          onClick={() => navigate("/admin/create-event")} 
          style={{ background: "#ff2b6d", color: "#fff", border: "none", padding: "0.8rem 2rem", borderRadius: "1rem", cursor: "pointer", fontWeight: "bold" }}
        >
          + NEW EVENT
        </button>
      </div>

      <div style={{ display: "grid", gap: "1.5rem" }}>
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event._id} style={{ 
              background: "rgba(19, 24, 46, 0.6)", padding: "1.5rem", borderRadius: "1.2rem", 
              display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid rgba(255,255,255,0.1)"
            }}>
              <div>
                <p style={{ color: "#ff2b6d", fontSize: "0.8rem", margin: 0 }}>By {event.author}</p>
                <strong style={{ fontSize: "1.3rem", display: "block" }}>{event.title}</strong>
                <span style={{ color: "#888", fontSize: "0.9rem" }}>{event.date}</span>
              </div>
              
              <div style={{ display: "flex", gap: "1rem" }}>
                <button 
                  onClick={() => navigate(`/admin/edit-event/${event._id}`)}
                  style={{ background: "#3b82f6", border: "none", padding: "0.6rem 1.2rem", borderRadius: "0.5rem", color: "#fff", cursor: "pointer" }}
                >
                  Edit
                </button>
                <button 
                  onClick={() => deleteEvent(event._id)}
                  style={{ background: "#ff2b6d", border: "none", padding: "0.6rem 1.2rem", borderRadius: "0.5rem", color: "#fff", cursor: "pointer" }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", color: "#888" }}>No events found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminEvents;