import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { BACKEND_URL } from "../url";
import { getItem, setItem, removeItem } from "../local_storage";

const refreshAuthToken = async () => {
  const refreshToken = getItem("refreshToken");

  if (!refreshToken) throw new Error("No refresh token available");

  const response = await axios.post(`${BACKEND_URL}/auth/refresh`, {
    refreshToken,
  });

  if (response.data?.success) {
    const tokenPayload = {
      token: response.data.token,
    };
    setItem(tokenPayload);
    return response.data.token;
  } else {
    throw new Error("Token refresh failed");
  }
};

const ProtectedRoute = () => {
  const token = getItem("token");

  const { mutate, isLoading, isError } = useMutation({
    mutationFn: refreshAuthToken,
    onSuccess: (newToken) => {
      if (newToken) {
        window.location.reload();
      }
    },
    onError: () => {
      removeItem("token");
      removeItem("refreshToken");
    },
  });

  useEffect(() => {
    if (!token) {
      mutate();
    }
  }, [token, mutate]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <Navigate to="/login" replace />;

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
