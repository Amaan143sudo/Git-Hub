import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const AdminRegistrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { authorizationToken, isLoading } = useAuth();

  const getAllRegistrations = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/admin/registrations", {
        method: "GET",
        headers: { "Authorization": authorizationToken },
      });
      const data = await response.json();
      if (response.ok) {
        setRegistrations(data);
      }
    } catch (error) {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  const approveRegistration = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/admin/registrations/approve/${id}`, {
        method: "PATCH",
        headers: { "Authorization": authorizationToken },
      });
      if (response.ok) {
        toast.success("Approved!");
        getAllRegistrations();
      }
    } catch (error) { toast.error("Approval failed"); }
  };

  const deleteRegistration = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/admin/registrations/delete/${id}`, {
        method: "DELETE",
        headers: { "Authorization": authorizationToken },
      });
      if (response.ok) {
        toast.success("Deleted!");
        getAllRegistrations();
      }
    } catch (error) { toast.error("Delete failed"); }
  };

  useEffect(() => {
    if (!isLoading) getAllRegistrations();
  }, [isLoading, authorizationToken]);

  if (loading) return <h2 style={{color:"white", textAlign:"center", marginTop:"50px"}}>Loading...</h2>;

  return (
    <div style={{ padding: "40px", background: "#0b0e1a", minHeight: "100vh", color: "#fff" }}>
      <h1 style={{ color: "#ff2b6d", marginBottom: "30px" }}>Event Registrations</h1>
      
      <table style={{ 
        width: "100%", 
        background: "#13182e", 
        borderCollapse: "collapse",
        tableLayout: "fixed" 
      }}>
        <thead>
          <tr style={{ background: "#1e2436", color: "#8892b0" }}>
            <th style={{ padding: "15px", width: "15%", textAlign: "center" }}>User</th>
            <th style={{ padding: "15px", width: "25%", textAlign: "center" }}>Email</th>
            <th style={{ padding: "15px", width: "25%", textAlign: "center" }}>Event Title</th>
            <th style={{ padding: "15px", width: "15%", textAlign: "center" }}>Status</th>
            <th style={{ padding: "15px", width: "20%", textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {registrations.length > 0 ? registrations.map((reg) => (
            <tr key={reg._id} style={{ borderBottom: "1px solid #1e2436" }}>
              <td style={{ padding: "15px", textAlign: "center", wordWrap: "break-word" }}>{reg.username}</td>
              <td style={{ padding: "15px", textAlign: "center", wordWrap: "break-word" }}>{reg.email}</td>
              <td style={{ padding: "15px", textAlign: "center", wordWrap: "break-word" }}>{reg.eventTitle}</td>
              <td style={{ padding: "15px", textAlign: "center" }}>
                {reg.isApproved ? 
                  <span style={{color: "#28a745", fontWeight: "bold"}}>Approved</span> : 
                  <span style={{color: "#ffc107"}}>Pending</span>
                }
              </td>
              <td style={{ padding: "10px", textAlign: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "center" }}>
                  {!reg.isApproved && (
                    <button onClick={() => approveRegistration(reg._id)} style={{ background: "#28a745", color: "#fff", border: "none", padding: "6px 0", cursor: "pointer", borderRadius: "4px", width: "90%", fontSize: "12px", fontWeight: "bold" }}>Approve</button>
                  )}
                  <button onClick={() => deleteRegistration(reg._id)} style={{ background: "#ff2b6d", color: "#fff", border: "none", padding: "6px 0", cursor: "pointer", borderRadius: "4px", width: "90%", fontSize: "12px", fontWeight: "bold" }}>Delete</button>
                </div>
              </td>
            </tr>
          )) : (
            <tr><td colSpan="5" style={{ padding: "20px", textAlign: "center" }}>No registrations found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminRegistrations;