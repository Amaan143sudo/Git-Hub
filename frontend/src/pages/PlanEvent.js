import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth";

const PlanEvent = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    eventType: "Corporate Event",
    eventDate: "",
    location: "",
    guestCount: "",
    budgetRange: "100k – 500k",
    message: "",
  });

  // Services Checkboxes State
  const [services, setServices] = useState({
    decoration: false,
    catering: false,
    photography: false,
    soundSystem: false,
    stageSetup: false,
    lighting: false,
    security: false,
    hosting: false,
  });

  // Budget Calculator State
  const [estimatedCost, setEstimatedCost] = useState(0);

  // Live Budget Calculation Logic
  useEffect(() => {
    let cost = 0;
    const guests = parseInt(formData.guestCount) || 0;

    if (services.catering) cost += guests * 450; // Per head estimation
    if (services.decoration) cost += 30000;
    if (services.photography) cost += 25000;
    if (services.soundSystem) cost += 15000;
    if (services.stageSetup) cost += 20000;
    if (services.lighting) cost += 10000;
    if (services.security) cost += 12000;
    if (services.hosting) cost += 15000;

    setEstimatedCost(cost);
  }, [services, formData.guestCount]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    setServices({ ...services, [name]: checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Secure layer check
    if (!isLoggedIn) {
      toast.error("Please login first to submit a custom event plan!");
      return navigate("/login");
    }

    try {
      const token = localStorage.getItem("token");
      const finalToken =
        token && token.startsWith("Bearer ") ? token : `Bearer ${token}`;
      const payload = { ...formData, servicesRequired: services };

      // backend par route map kiya
      const response = await fetch(
        "http://localhost:8000/api/form/book-event",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: finalToken,
          },
          body: JSON.stringify(payload),
        },
      );

      const res_data = await response.json();

      if (response.ok) {
        toast.success("Thank you! Your custom plan has been submitted. 🎉");
        navigate("/");
      } else {
        toast.error(res_data.msg || "Submission failed, please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server connection lost.");
    }
  };

  const openWhatsApp = () => {
    const whatsappNum = "923001234567"; // 🟢 Apna number yahan add karein
    const text = `Hi EventSphere! Mera naam ${formData.username || "Customer"} hai. Mujhe ek ${formData.eventType} customize karwana hai ${formData.location ? `at ${formData.location}` : ""}. Standard calculator cost PKR ${estimatedCost.toLocaleString()} show ho rahi hai. Please guide.`;
    window.open(
      `https://api.whatsapp.com/send?phone=${whatsappNum}&text=${encodeURIComponent(text)}`,
      "_blank",
    );
  };

  return (
    <section
      style={{
        padding: "6rem 2rem",
        background: "#111",
        color: "#fff",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          background: "#1c1c24",
          padding: "4rem",
          borderRadius: "2rem",
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
        }}
      >
        <h2
          style={{
            fontSize: "3.2rem",
            textAlign: "center",
            color: "#646cff",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          Plan My Custom Event
        </h2>
        <p
          style={{
            textAlign: "center",
            color: "#aaa",
            fontSize: "1.5rem",
            marginBottom: "4rem",
          }}
        >
          Apni requirements khud choose karein aur on-the-spot estimate haasil
          karein.
        </p>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}
        >
          {/* Group 1: Personal Data */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(22rem, 1fr))",
              gap: "2rem",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <label style={{ fontSize: "1.4rem", color: "#ccc" }}>
                Full Name
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInput}
                required
                placeholder="Full Name"
                style={{
                  padding: "1.2rem",
                  background: "#222",
                  border: "1px solid #444",
                  color: "#fff",
                  borderRadius: "0.8rem",
                  fontSize: "1.4rem",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <label style={{ fontSize: "1.4rem", color: "#ccc" }}>
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInput}
                required
                placeholder="03XXXXXXXXX"
                style={{
                  padding: "1.2rem",
                  background: "#222",
                  border: "1px solid #444",
                  color: "#fff",
                  borderRadius: "0.8rem",
                  fontSize: "1.4rem",
                }}
              />
            </div>
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <label style={{ fontSize: "1.4rem", color: "#ccc" }}>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInput}
              required
              placeholder="example@mail.com"
              style={{
                padding: "1.2rem",
                background: "#222",
                border: "1px solid #444",
                color: "#fff",
                borderRadius: "0.8rem",
                fontSize: "1.4rem",
              }}
            />
          </div>

          {/* Group 2: Event Type & Date */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(22rem, 1fr))",
              gap: "2rem",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <label style={{ fontSize: "1.4rem", color: "#ccc" }}>
                Event Type
              </label>
              <select
                name="eventType"
                value={formData.eventType}
                onChange={handleInput}
                style={{
                  padding: "1.2rem",
                  background: "#222",
                  border: "1px solid #444",
                  color: "#fff",
                  borderRadius: "0.8rem",
                  fontSize: "1.4rem",
                }}
              >
                <option value="Wedding">Wedding</option>
                <option value="Birthday">Birthday</option>
                <option value="Corporate Event">Corporate Event</option>
                <option value="Mehndi">Mehndi</option>
                <option value="Walima">Walima</option>
                <option value="Concert">Concert</option>
                <option value="Exhibition">Exhibition</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <label style={{ fontSize: "1.4rem", color: "#ccc" }}>
                Event Date
              </label>
              <input
                type="date"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleInput}
                required
                style={{
                  padding: "1.2rem",
                  background: "#222",
                  border: "1px solid #444",
                  color: "#fff",
                  borderRadius: "0.8rem",
                  fontSize: "1.4rem",
                }}
              />
            </div>
          </div>

          {/* Group 3: Location & Guests */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(22rem, 1fr))",
              gap: "2rem",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <label style={{ fontSize: "1.4rem", color: "#ccc" }}>
                City / Venue Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInput}
                required
                placeholder="e.g., Karachi / Venue Name"
                style={{
                  padding: "1.2rem",
                  background: "#222",
                  border: "1px solid #444",
                  color: "#fff",
                  borderRadius: "0.8rem",
                  fontSize: "1.4rem",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <label style={{ fontSize: "1.4rem", color: "#ccc" }}>
                Approx. Number of Guests
              </label>
              <input
                type="number"
                name="guestCount"
                value={formData.guestCount}
                onChange={handleInput}
                required
                placeholder="e.g., 200"
                style={{
                  padding: "1.2rem",
                  background: "#222",
                  border: "1px solid #444",
                  color: "#fff",
                  borderRadius: "0.8rem",
                  fontSize: "1.4rem",
                }}
              />
            </div>
          </div>

          {/* Budget Target Dropdown */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <label style={{ fontSize: "1.4rem", color: "#ccc" }}>
              Expected Budget Range
            </label>
            <select
              name="budgetRange"
              value={formData.budgetRange}
              onChange={handleInput}
              style={{
                padding: "1.2rem",
                background: "#222",
                border: "1px solid #444",
                color: "#fff",
                borderRadius: "0.8rem",
                fontSize: "1.4rem",
              }}
            >
              <option value="Under 50k">Under 50k</option>
              <option value="50k – 100k">50k – 100k</option>
              <option value="100k – 500k">100k – 500k</option>
              <option value="Premium">Premium</option>
            </select>
          </div>

          {/* Checklist Dynamic Area */}
          <div
            style={{
              background: "#222",
              padding: "2.5rem",
              borderRadius: "1rem",
              border: "1px solid #333",
            }}
          >
            <label
              style={{
                fontSize: "1.6rem",
                color: "#646cff",
                fontWeight: "bold",
                display: "block",
                marginBottom: "1.5rem",
              }}
            >
              Select Services Required:
            </label>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(15rem, 1fr))",
                gap: "1.5rem",
              }}
            >
              {Object.keys(services).map((name) => (
                <label
                  key={name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    fontSize: "1.4rem",
                    cursor: "pointer",
                    textTransform: "capitalize",
                  }}
                >
                  <input
                    type="checkbox"
                    name={name}
                    checked={services[name]}
                    onChange={handleCheckbox}
                    style={{
                      width: "1.8rem",
                      height: "1.8rem",
                      accentColor: "#646cff",
                    }}
                  />
                  {name === "soundSystem"
                    ? "DJ / Sound"
                    : name === "stageSetup"
                      ? "Stage Setup"
                      : name}
                </label>
              ))}
            </div>
          </div>

          {/* LIVE BUDGET COUNTER BOX */}
          <div
            style={{
              background: "linear-gradient(135deg, #111, #1e1e2d)",
              padding: "2rem",
              borderRadius: "1rem",
              borderLeft: "5px solid #2ed573",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <div>
              <span
                style={{
                  fontSize: "1.2rem",
                  color: "#aaa",
                  textTransform: "uppercase",
                  display: "block",
                }}
              >
                Estimated Tool Cost
              </span>
              <span
                style={{
                  fontSize: "2.4rem",
                  fontWeight: "bold",
                  color: "#2ed573",
                }}
              >
                PKR {estimatedCost.toLocaleString()}
              </span>
            </div>
            <p
              style={{
                fontSize: "1.2rem",
                color: "#888",
                textAlign: "right",
                maxWidth: "250px",
              }}
            >
              *Rates variations are calculated based on vendor indexes.
            </p>
          </div>

          {/* Description Textarea */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <label style={{ fontSize: "1.4rem", color: "#ccc" }}>
              Event Description / Requirements
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInput}
              required
              rows="5"
              placeholder="Apni requirements detail me likhein..."
              style={{
                padding: "1.2rem",
                background: "#222",
                border: "1px solid #444",
                color: "#fff",
                borderRadius: "0.8rem",
                fontSize: "1.4rem",
                resize: "none",
              }}
            ></textarea>
          </div>

          {/* Call to Actions Layer */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              marginTop: "1rem",
            }}
          >
            <button
              type="submit"
              style={{
                padding: "1.5rem",
                background: "#646cff",
                color: "#fff",
                border: "none",
                borderRadius: "0.8rem",
                cursor: "pointer",
                fontSize: "1.6rem",
                fontWeight: "bold",
              }}
            >
              Send Requirement & Plan My Event ➔
            </button>

            <button
              type="button"
              onClick={openWhatsApp}
              style={{
                padding: "1.4rem",
                background: "#25D366",
                color: "#fff",
                border: "none",
                borderRadius: "0.8rem",
                cursor: "pointer",
                fontSize: "1.5rem",
                fontWeight: "bold",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <span style={{ fontSize: "1.8rem" }}>💬</span> Quickly discuss on
              WhatsApp
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default PlanEvent;
