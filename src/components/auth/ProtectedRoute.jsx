import { Navigate, Outlet } from "react-router";
import { useEffect, useState } from "react";
import { autoLogout, getToken } from "../../utils/auth";
import { toast } from "react-toastify";

const ProtectedRoute = () => {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   autoLogout(() => {
  //     setIsAuthenticated(false);
  //     toast.error("Session expired! Logging out...");
  //   });

  //   setIsAuthenticated(!!getToken());
  // }, []);
  const isAuthenticated = !!getToken();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
