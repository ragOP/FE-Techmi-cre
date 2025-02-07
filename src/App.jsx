import React from "react"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/home"
import Service from "./pages/services"
import Navbar from "./components/navbar"
import Footer from "./components/footer"

const App = () => {
  return (
    <div className="bg-[#82c8e51a]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/service" element={<Service />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
