import React from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Home from "./pages/home";
import Service from "./pages/services";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Login from "./pages/login";
import SearchResult from "./components/search/Search_Result";
import Signup from "./pages/signup";
import { getItem } from "./utils/local_storage";
import Cart from "./pages/cart";
import SingleProduct from "./pages/single_product";
import ProtectedRoute from "./utils/auth/ProtectedRoute";
import { FloatingWhatsApp } from 'react-floating-whatsapp'
import userLogo from "./assets/navbar/user-image.png";

const App = () => {
  const location = useLocation();
  const token = getItem("token");

  const hideLayoutRoutes = ["/login", "/signup"];

  return (
    <div className="bg-[#82c8e51a]">
      {!hideLayoutRoutes.includes(location.pathname) && <Navbar />}

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

      {!hideLayoutRoutes.includes(location.pathname) && <Footer />}
      <FloatingWhatsApp phoneNumber="9409718733" accountName="Abhishek Mishra" avatar={userLogo}/>
    </div>
  );
};

export default App;
