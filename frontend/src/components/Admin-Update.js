// src/pages/Admin-Update.js
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({ username: "", email: "", phone: "" });

  // Single user ka data fetch karne ka logic yahan aayega baad mein...
  console.log("Editing User ID:", id);

  return (
    <div style={{ padding: "5rem", textAlign: "center", color: "#fff", background: "#1a1a1a" }}>
      <h2>Edit User Details (ID: {id})</h2>
      <p>Bhai, yeh update page ab successfully khul raha hai!</p>
      <button onClick={() => navigate("/admin/users")} style={{ padding: "0.5rem 1rem", marginTop: "1rem", cursor: "pointer" }}>
        Back to Users
      </button>
    </div>
  );
};

export default AdminUpdate;