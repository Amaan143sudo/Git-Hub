// EventDetails.js mein ye changes karein

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const EventDetails = () => {
  const { id } = useParams(); // URL se ID lo
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/events/${id}`);
        if (response.ok) {
          const data = await response.json();
          setEvent(data);
        }
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };
    fetchEventDetails();
  }, [id]);

  if (!event) return <h1 style={{ color: "#fff", textAlign: "center" }}>Loading...</h1>;

  return (
    <div style={{ color: "#fff", padding: "50px" }}>
      <h1>{event.title}</h1>
      <img src={`http://localhost:8000/${event.image}`} alt={event.title} style={{ width: "400px" }} />
      <p>{event.description}</p>
      <p>Date: {event.date}</p>
    </div>
  );
};

export default EventDetails;