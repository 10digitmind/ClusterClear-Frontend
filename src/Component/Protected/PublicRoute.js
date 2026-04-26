import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PublicRoute({ children }) {
  const token = localStorage.getItem("token");
   const user = useSelector((state) => state.auth.user);

  if (token || user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}