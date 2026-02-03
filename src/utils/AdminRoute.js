import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  // 🔥 SAFE ROLE CHECK
  if (role && role.toUpperCase().includes("ADMIN")) {
    return children;
  }

  return <Navigate to="/dashboard" replace />;
}

export default AdminRoute;
