import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);

  const getContactsData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8000/api/admin/contacts", {
        method: "GET",
        headers: { Authorization: token.startsWith("Bearer ") ? token : `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setContacts(data);
      } else {
        console.error("Failed to fetch contacts");
      }
    } catch (error) {
      console.error("Network Error:", error);
    }
  };

  const deleteContact = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:8000/api/admin/contacts/delete/${id}`, {
        method: "DELETE",
        headers: { Authorization: token.startsWith("Bearer ") ? token : `Bearer ${token}` },
      });

      if (response.ok) {
        toast.success("Contact Deleted Successfully");
        getContactsData();
      }
    } catch (error) {
      toast.error("Failed to delete contact");
    }
  };

  const handleReply = async (id) => {
    const replyText = prompt("Enter your reply message:");
    if (!replyText) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:8000/api/admin/contacts/update/${id}`, {
        method: "PATCH",
        headers: { 
          "Authorization": token.startsWith("Bearer ") ? token : `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ replyText }),
      });

      if (response.ok) {
        toast.success("Replied Successfully!");
        getContactsData();
      }
    } catch (error) {
      toast.error("Error sending reply");
    }
  };

  useEffect(() => {
    getContactsData();
  }, []);

  return (
    <div style={{ color: "#fff", padding: "2rem" }}>
      <h1 style={{ marginBottom: "1rem" }}>Messages</h1>
      <table style={{ width: "100%", marginTop: "2rem", borderCollapse: "separate", borderSpacing: "0 10px" }}>
        <thead>
          <tr style={{ textAlign: "left", color: "#888" }}>
            <th style={{ padding: "1rem" }}>Name</th>
            <th style={{ padding: "1rem" }}>Email</th>
            <th style={{ padding: "1rem" }}>Message</th>
            <th style={{ padding: "1rem" }}>Status</th>
            <th style={{ padding: "1rem" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact._id} style={{ background: "rgba(255,255,255,0.05)", borderRadius: "10px" }}>
              <td style={{ padding: "1rem" }}>{contact.username}</td>
              <td style={{ padding: "1rem" }}>{contact.email}</td>
              <td style={{ padding: "1rem" }}>{contact.message}</td>
              <td style={{ padding: "1rem" }}>
                <span style={{ 
                    padding: "5px 12px", 
                    borderRadius: "20px", 
                    fontSize: "0.85rem",
                    background: contact.status === "Replied" ? "#10b981" : "#f59e0b",
                    color: "#fff" 
                }}>
                  {contact.status || "Pending"}
                </span>
              </td>
              <td style={{ padding: "1rem", display: "flex", gap: "10px" }}>
                <button 
                  onClick={() => handleReply(contact._id)}
                  style={{ background: "#3b82f6", color: "#fff", border: "none", padding: "8px 15px", borderRadius: "6px", cursor: "pointer" }}
                >
                  Reply
                </button>
                <button 
                  onClick={() => deleteContact(contact._id)}
                  style={{ background: "#ef4444", color: "#fff", border: "none", padding: "8px 15px", borderRadius: "6px", cursor: "pointer" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminContacts;