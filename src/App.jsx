import React, { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import userLogo from "./assets/navbar/user-image.png";
import LazyLoader from "./components/loader/LazyLoader";
import WebsiteLoader from "./components/loader/WebsiteLoader";
import "./styles/toastStyles.css";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { autoLogout } from "./utils/auth";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { getItem, removeItem } from "./utils/local_storage";

const WHATSAPP_USER_NAME = "Abhishek";
const WHATSAPP_PHONE_NUMBER = "9409718733";

const Home = lazy(() => import("./pages/home"));
const Service = lazy(() => import("./pages/services"));
const Login = lazy(() => import("./pages/login"));
const Signup = lazy(() => import("./pages/signup"));
const SearchResult = lazy(() => import("./components/search/Search_Result"));
const Cart = lazy(() => import("./pages/cart"));
const SingleProduct = lazy(() => import("./pages/single_product"));

const App = () => {
  const location = useLocation();
  const token = localStorage.getItem("token");

  const hideLayoutRoutes = ["/login", "/signup"];

  const [initalWebsiteLoader, setInitialWebsiteLoader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setTimeout(() => {
        setInitialWebsiteLoader(false);
      }, 2000);
    });
  }, []);

  useEffect(() => {
    if (token) {
      autoLogout(() => {
        alert("Session expired! Logging out...");
      });
    }
  }, [token]);

  const checkTokenExpiration = () => {
    const storedToken = getItem("token");
    if (!storedToken) return;

    try {
      const decodedToken = jwtDecode(storedToken);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        removeItem("token");
        toast.error("Your session has expired. Please login again.", {
          autoClose: 3000,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      removeItem("token");
    }
  };

  useEffect(() => {
    checkTokenExpiration();
  }, []);

  if (initalWebsiteLoader) {
    return <WebsiteLoader />;
  }

  return (
    <>
      <div className="bg-[#82c8e51a]">
        {!hideLayoutRoutes.includes(location.pathname) && <Navbar />}
        <Suspense fallback={<LazyLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={token ? <Navigate to="/" replace /> : <Login />}
            />
            <Route
              path="/signup"
              element={token ? <Navigate to="/" replace /> : <Signup />}
            />
            <Route path="/service" element={<Service />} />
            <Route path="/search" element={<SearchResult />} />
            <Route path="/product/:id" element={<SingleProduct />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/cart" element={<Cart />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
        {!hideLayoutRoutes.includes(location.pathname) && <Footer />}
        <FloatingWhatsApp
          phoneNumber={WHATSAPP_PHONE_NUMBER}
          accountName={WHATSAPP_USER_NAME}
          avatar={userLogo}
        />
      </div>
    </>
  );
};

export default App;
