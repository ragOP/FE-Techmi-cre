import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/home";
import Service from "./pages/services";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Login from "./pages/login";

const App = () => {
  const location = useLocation(); // Get the current route

  // Define routes that should NOT include Navbar & Footer
  const hideLayoutRoutes = ["/login"];

  return (
    <div className="bg-[#82c8e51a]">
      {/* Show Navbar only if route is NOT in hideLayoutRoutes */}
      {!hideLayoutRoutes.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Service />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      {/* Show Footer only if route is NOT in hideLayoutRoutes */}
      {!hideLayoutRoutes.includes(location.pathname) && <Footer />}
    </div>
  );
};

export default App;
