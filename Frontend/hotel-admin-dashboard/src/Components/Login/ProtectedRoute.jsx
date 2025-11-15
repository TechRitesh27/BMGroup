import { Navigate } from "react-router-dom";
import HomePage from "../HomePage/HomePage.jsx";
const ProtectedRoute = ({ children, role }) => {
  const session = JSON.parse(sessionStorage.getItem("session"));

  if (!session) return <Navigate to="/login" />;

  if (Date.now() > session.expiresAt) {
    sessionStorage.removeItem("session");
    return <Navigate to="/HomePage" />;
  }

  if (role && session.role !== role) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;
