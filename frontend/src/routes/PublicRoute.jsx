import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PublicRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (user ? <Navigate to="/" replace /> : <Outlet />);
}