import React from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Home from "./pages/home";
import Service from "./pages/services";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Login from "./pages/login";
import SearchResult from "./components/search/Search_Result";
import Signup from "./pages/signup";
import ProtectedRoute from "./utils/auth/ProtectedRoute";
import { getItem } from "./utils/local_storage";
import Cart from "./pages/cart";
import SingleProduct from "./pages/single_product";

const App = () => {
  const location = useLocation();
  const token = getItem("token");

  const hideLayoutRoutes = ["/login", "/signup"];

  return (
    <div className="bg-[#82c8e51a]">
      {!hideLayoutRoutes.includes(location.pathname) && <Navbar />}

      <Routes>
        {/* Redirect logged-in users away from login/signup */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={token ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/signup" element={token ? <Navigate to="/" replace /> : <Signup />} />
        <Route path="/service" element={<Service />} />
        <Route path="/search" element={<SearchResult />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        {/* Protected Routes (Only accessible if logged in) */}
        {/* <Route element={<ProtectedRoute />}>
        </Route> */}

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {!hideLayoutRoutes.includes(location.pathname) && <Footer />}
    </div>
  );
};

export default App;