import { useState, useEffect } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const Contact = () => {
  const [contact, setContact] = useState({ username: "", email: "", message: "" });
  const { user } = useAuth();
  const [userData, setUserData] = useState(true);

  useEffect(() => {
    if (userData && user) {
      setContact({ username: user.username, email: user.email, message: "" });
      setUserData(false);
    }
  }, [user, userData]);

  const handleInput = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/form/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });
      if (response.ok) {
        setContact({ ...contact, message: "" });
        toast.success("Message sent successfully! 🚀");
      } else {
        toast.error("Failed to send message.");
      }
    } catch (error) {
      toast.error("Server error, please try again.");
    }
  };

  return (
    <section style={{ padding: "6rem 2rem", background: "#0b0e1a", color: "#fff" }}>
      <div className="container" style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center" }}>
        
        {/* Left Side: Image with Overlay */}
        <div style={{ borderRadius: "2rem", overflow: "hidden", height: "500px" }}>
          <img src="https://images.pexels.com/photos/8867431/pexels-photo-8867431.jpeg" alt="Support" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>

        {/* Right Side: Glassmorphism Form */}
        <div style={{ background: "#13182e", padding: "4rem", borderRadius: "2rem", border: "1px solid #222" }}>
          <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>Contact <span style={{ color: "#ff2b6d" }}>Us</span></h1>
          <p style={{ color: "#aaa", marginBottom: "3rem" }}>Got a question? We're just a message away.</p>
          
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {["username", "email"].map((field) => (
              <input key={field} type={field === "email" ? "email" : "text"} name={field} placeholder={`Enter your ${field}`} value={contact[field]} onChange={handleInput} required 
                style={{ background: "#0b0e1a", border: "1px solid #333", padding: "1.5rem", borderRadius: "1rem", color: "#fff", outline: "none" }} />
            ))}
            <textarea name="message" placeholder="How can we help?" value={contact.message} onChange={handleInput} required rows="5"
              style={{ background: "#0b0e1a", border: "1px solid #333", padding: "1.5rem", borderRadius: "1rem", color: "#fff", outline: "none", resize: "none" }} />
            
            <button type="submit" style={{ padding: "1.5rem", background: "#ff2b6d", border: "none", color: "#fff", borderRadius: "1rem", cursor: "pointer", fontWeight: "bold", fontSize: "1.6rem" }}>
              Send Message 📩
            </button>
          </form>
        </div>
      </div>

      {/* Map Section: Karachi Location */}
      <section style={{ marginTop: "8rem", borderRadius: "2rem", overflow: "hidden", border: "5px solid #13182e" }}>
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.664070008434!2d67.0673!3d24.8607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMj রয়েছেNDgnMzguNSJOIDY3wrAwNCcwMi4zIkU!5e0!3m2!1sen!2s!4v1612345678901" 
          width="100%" height="450" style={{ border: 0 }} allowFullScreen="" loading="lazy">
        </iframe>
      </section>
    </section>
  );
};

export default Contact;