import { Navigate, Outlet } from "react-router-dom";
import { getItem } from "../local_storage";

const ProtectedRoute = () => {
  const token = getItem("token");

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
