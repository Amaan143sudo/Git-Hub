import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
  const [eventData, setEventData] = useState({ 
    title: "", 
    description: "", 
    date: "", 
    author: "" 
  });
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleInput = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    // Image validation (sirf images allow karein)
    if (selectedFile && !selectedFile.type.startsWith("image/")) {
      toast.error("Please select a valid image file!");
      return;
    }
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic Validation
    if (eventData.title.length < 5) {
      toast.error("Title must be at least 5 characters long.");
      return;
    }

    const formData = new FormData();
    formData.append("title", eventData.title);
    formData.append("description", eventData.description);
    formData.append("date", eventData.date);
    formData.append("author", eventData.author);
    if (file) formData.append("image", file);

    try {
      const res = await fetch("http://localhost:8000/api/events/create", {
        method: "POST",
        headers: { 
          "Authorization": `Bearer ${localStorage.getItem("token")}` 
        },
        body: formData,
      });

      const resData = await res.json();
      if (res.ok) {
        toast.success("Event Created Successfully! 🎉");
        navigate("/admin/events");
      } else {
        toast.error(resData.message || "Failed to create event");
      }
    } catch (err) {
      toast.error("Server Error: Unable to create event");
    }
  };

  // Inline Style Object for Professional Look
  const inputStyle = { padding: "12px", borderRadius: "8px", border: "1px solid #334155", background: "#0b0e1a", color: "#fff", marginBottom: "15px" };

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "auto", background: "#13182e", borderRadius: "15px", color: "#fff" }}>
      <h2 style={{ textAlign: "center", marginBottom: "25px", color: "#ff2b6d" }}>Create New Event</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
        <label>Event Title</label>
        <input name="title" value={eventData.title} onChange={handleInput} placeholder="Enter catchy title" required style={inputStyle} />
        
        <label>Description</label>
        <textarea name="description" value={eventData.description} onChange={handleInput} placeholder="Describe your event..." required style={{...inputStyle, height: "100px", resize: "none"}} />
        
        <div style={{ display: "flex", gap: "10px" }}>
          <div style={{ flex: 1 }}>
            <label>Date</label>
            <input name="date" type="date" value={eventData.date} onChange={handleInput} required style={inputStyle} />
          </div>
          <div style={{ flex: 1 }}>
            <label>Author</label>
            <input name="author" value={eventData.author} onChange={handleInput} placeholder="Admin Name" required style={inputStyle} />
          </div>
        </div>

        <label>Upload Banner/Image</label>
        <input type="file" onChange={handleFileChange} required style={{ marginBottom: "20px" }} />
        
        <button type="submit" style={{ padding: "15px", background: "#ff2b6d", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "1rem", fontWeight: "bold" }}>
          Submit Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;