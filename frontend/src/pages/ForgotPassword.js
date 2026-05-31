import React, { useState } from "react";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const forgotImgURL = "https://img.freepik.com/free-vector/forgot-password-concept-illustration_114360-1123.jpg";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Frontend sirf API ko request bhejta hai
      const response = await fetch("http://localhost:8000/api/auth/forgotpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const res_data = await response.json();

      if (response.ok) {
        toast.success("Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(res_data.msg || "Email not found.");
      }
    } catch (error) {
      console.error("Forgot Password Error:", error);
      toast.error("Server error. Please try again later.");
    }
  };

  return (
    <main>
      <section className="section-registration">
        <div className="container grid grid-two-cols">
          <div className="reg-img">
            <img src={forgotImgURL} alt="Forgot Password Illustration" />
          </div>

          <div className="registration-form">
            <h1 className="main-heading">Forgot <span>Password?</span></h1>
            <p style={{ fontSize: "1.4rem", color: "#777", marginBottom: "3rem" }}>
              Enter your email and we'll send you a link to reset your password.
            </p>

            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email">Registered Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <button type="submit" className="btn-submit">
                Send Reset Link
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ForgotPassword;