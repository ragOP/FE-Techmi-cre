import React, { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import ProtectedRoute from "./utils/auth/ProtectedRoute";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import userLogo from "./assets/navbar/user-image.png";
import ToastContainer from "./components/toast/ToastContainer";
import LazyLoader from "./components/loader/LazyLoader";
import WebsiteLoader from "./components/loader/WebsiteLoader";
import "./styles/toastStyles.css"

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


  if (initalWebsiteLoader) {
    return <WebsiteLoader />;
  }

  return (
    <div className="bg-[#82c8e51a]">
      {!hideLayoutRoutes.includes(location.pathname) && <Navbar />}\
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

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        className="custom-toast-container"
      />
      <FloatingWhatsApp
        phoneNumber="9409718733"
        accountName="Abhishek Mishra"
        avatar={userLogo}
      />
    </div>
  );
};

export default App;
