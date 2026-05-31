import { useState } from "react";
import { useAuth } from "../store/auth";

const AdminExpos = () => {
  const [expo, setExpo] = useState({ title: "", location: "", date: "" });
  const { authorizationToken } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:8000/api/admin/expo/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
        body: JSON.stringify(expo),
      });
      alert("Expo added!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        onChange={(e) => setExpo({ ...expo, title: e.target.value })}
      />
      <button type="submit">Add Expo</button>
    </form>
  );
};

export default AdminExpos;
