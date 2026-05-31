import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  // 1. Data Fetching Function
  const getAllUsersData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8000/api/admin/users", {
        method: "GET",
        headers: {
          Authorization: token.startsWith("Bearer ") ? token : `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        toast.error("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Server Error");
    }
  };

  // 2. Delete Function
  const deleteUser = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:8000/api/admin/users/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: token.startsWith("Bearer ") ? token : `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success("User Deleted Successfully");
        getAllUsersData(); // List refresh
      } else {
        toast.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getAllUsersData();
  }, []);

  return (
    <div style={{ padding: "2rem", color: "#fff", fontFamily: "'Inter', sans-serif" }}>
      <h1 style={{ marginBottom: "2rem", fontSize: "2rem" }}>Users <span style={{ color: "#ff2b6d" }}>Management</span></h1>
      
      {/* Table Wrapper */}
      <div style={{ 
        background: "rgba(19, 24, 46, 0.6)", 
        borderRadius: "1.5rem", 
        padding: "1rem", 
        border: "1px solid rgba(255, 255, 255, 0.05)" 
      }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ color: "#888", borderBottom: "1px solid #333" }}>
              <th style={{ padding: "1.5rem" }}>Name</th>
              <th style={{ padding: "1.5rem" }}>Email</th>
              <th style={{ padding: "1.5rem" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id} style={{ borderBottom: "1px solid #222" }}>
                  <td style={{ padding: "1.5rem" }}>{user.username}</td>
                  <td style={{ padding: "1.5rem" }}>{user.email}</td>
                  <td style={{ padding: "1.5rem", display: "flex", gap: "1rem" }}>
                    
                    {/* Edit Button */}
                    <Link to={`/admin/users/${user._id}/edit`}>
                      <button style={{ 
                        padding: "0.5rem 1rem", borderRadius: "0.5rem", border: "none", 
                        background: "#3b82f6", color: "#fff", cursor: "pointer" 
                      }}>Edit</button>
                    </Link>

                    {/* Delete Button */}
                    <button 
                      onClick={() => deleteUser(user._id)}
                      style={{ 
                        padding: "0.5rem 1rem", borderRadius: "0.5rem", border: "none", 
                        background: "#ff2b6d", color: "#fff", cursor: "pointer" 
                      }}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={{ textAlign: "center", padding: "3rem", color: "#888" }}>
                  No users found or loading...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;