import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../../assets/navbar/Logo.svg";
import cart from "../../assets/navbar/shopping-cart.svg";
import user from "../../assets/navbar/circle-user-round.svg";

const navContents = [
  { title: "Home", route: "/" },
  { title: "Services", route: "/service" },
  { title: "Blog", route: "/blog" },
  { title: "Contact Us", route: "/contact" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div className="bg-[#FBF6F166] px-6 py-3 flex items-center justify-between relative">
      <div className="flex items-center gap-1.5" onClick={handleLogoClick}>
        <img src={logo} alt="Logo" className="h-[40px] w-[40px] cursor-pointer" />
        <p className="text-[#1C0547] font-semibold text-xl leading-none">
          <span className="text-[#00008B]">Lo</span>
          <span className="text-[#1C0547]">go</span>
          <br />
          <span className="text-[#1C0547]">Ip</span>
          <span className="text-[#00008B]">sum</span>
        </p>
      </div>

      <div className="hidden md:flex justify-evenly rounded-3xl bg-[#F6F3F3] items-center">
        {navContents.map((n) => (
          <NavLink
            key={n.route}
            to={n.route}
            className={({ isActive }) =>
              `text-lg font-semibold px-3 py-2 ${isActive ? "text-[#00008B] underline" : ""}`
            }
          >
            {n.title}
          </NavLink>
        ))}
      </div>

      <div className="hidden md:flex items-center gap-3">
        <button className="flex items-center border-2 border-[#00008B] gap-1.5 px-4 py-2 rounded-full">
          <img src={cart} alt="Cart" className="h-[23px] w-[23px]" />
          <span className="text-[#00008B] font-medium text-lg">Cart</span>
        </button>

        <button className="flex items-center border border-black gap-1.5 px-4 py-2 bg-[#00008B] rounded-full">
          <img src={user} alt="User" className="h-[23px] w-[23px]" />
          <span className="text-[#FFFFFF] text-lg">Login</span>
        </button>
      </div>

      <div className="md:hidden flex items-center">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-2xl">
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute top-[60px] left-0 w-full bg-[#F6F3F3] flex flex-col items-center md:hidden z-50 shadow-lg">
          {navContents.map((n) => (
            <NavLink
              key={n.route}
              to={n.route}
              className={({ isActive }) =>
                `block text-lg font-semibold py-3 w-full text-center ${isActive ? "text-[#00008B] underline" : ""}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              {n.title}
            </NavLink>
          ))}

          <div className="flex flex-col items-center gap-3 py-4">
            <button className="flex items-center text-[#00008B] gap-1.5 px-4 py-2 rounded-full">
              <span className="text-[#00008B] font-medium text-lg">Cart</span>
            </button>

            <button className="flex items-center   gap-1.5 px-4 py-2  rounded-full">
              <span className=" text-[#00008B] font-medium text-lg">Login</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
