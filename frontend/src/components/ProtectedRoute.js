import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../store/auth";

const ProtectedRoute = ({ adminOnly = false }) => {
  const { isLoggedIn, user, isLoading } = useAuth();

  if (isLoading) return <h1>Loading...</h1>;
  if (!isLoggedIn) return <Navigate to="/login" />;
  if (adminOnly && !user.isAdmin) return <Navigate to="/" />;

  return <Outlet />;
};

export default ProtectedRoute;
