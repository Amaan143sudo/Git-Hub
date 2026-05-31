import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components & Layouts
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminLayout from "./components/layouts/Admin-Layout";
import AdminUpdate from "./components/Admin-Update"; // 🟢 Sahi Import

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PlanEvent from "./pages/PlanEvent";
import UpcomingEvents from "./pages/UpcomingEvents";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import ForgotPassword from "./pages/ForgotPassword";
import Gallery from "./pages/Gallery";
import EventDetails from "./pages/EventDetails";

// Admin Pages
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./components/Admin-Users";
import AdminContacts from "./pages/Admin-Contacts";
import AdminEvents from "./components/AdminEvents";
import CreateEvent from "./pages/CreateEvent";
import EditEvent from "./pages/EditEvent";
import AdminRegistrations from "./pages/AdminRegistrations"; // 🟢 Sahi Import

import "./App.css";

const AppRoutes = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <main className={!isAdminRoute ? "main-content" : ""}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/plan-event" element={<PlanEvent />} />
          <Route path="/upcoming-events" element={<UpcomingEvents />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/event-details/:id" element={<EventDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="users/:id/edit" element={<AdminUpdate />} /> {/* 🟢 Fixed Import */}
            <Route path="contacts" element={<AdminContacts />} />
            <Route path="events" element={<AdminEvents />} />
            <Route path="create-event" element={<CreateEvent />} />
            <Route path="edit-event/:id" element={<EditEvent />} />
            <Route path="registrations" element={<AdminRegistrations />} /> {/* 🟢 Fixed Import */}
          </Route>
          
          <Route path="*" element={<h1 style={{ textAlign: "center", padding: "10rem", color: "#fff" }}>404 - Page Not Found</h1>} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;