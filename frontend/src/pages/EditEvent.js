import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const EditEvent = () => {
  // 🟢 State mein location aur venue add kiye hain
  const [event, setEvent] = useState({ 
    title: "", 
    description: "", 
    date: "", 
    author: "",
    location: "", 
    venue: "" 
  });
  
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/events/${id}`);
        if (response.ok) {
          const data = await response.json();
          setEvent(data);
        } else {
          toast.error("Failed to fetch event data");
        }
      } catch (error) {
        toast.error("Server Error");
      }
    };
    fetchEvent();
  }, [id]);

  const handleInput = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/api/events/update/${id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}` 
        },
        body: JSON.stringify(event),
      });

      if (response.ok) {
        toast.success("Event Updated Successfully!");
        navigate("/admin/events");
      } else {
        toast.error("Update failed");
      }
    } catch (error) {
      toast.error("Server Error");
    }
  };

  return (
    <div className="admin-update-form" style={{ marginTop: "5rem" }}>
      <h2 style={{ marginBottom: "2rem" }}>Edit Event Details</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <input name="title" value={event.title} onChange={handleInput} placeholder="Event Title" required />
        <textarea name="description" value={event.description} onChange={handleInput} placeholder="Description" rows="4" required />
        
        {/* 🟢 Nayi Fields */}
        <input name="location" value={event.location} onChange={handleInput} placeholder="Location (e.g. Karachi)" required />
        <input name="venue" value={event.venue} onChange={handleInput} placeholder="Venue (e.g. PC Hotel)" required />
        
        <input name="date" type="date" value={event.date ? event.date.split("T")[0] : ""} onChange={handleInput} required />
        <input name="author" value={event.author} onChange={handleInput} placeholder="Author Name" required />
        
        <button type="submit" className="btn" style={{ width: "100%", marginTop: "1rem" }}>
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditEvent;