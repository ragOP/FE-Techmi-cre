import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import cart from "../../assets/navbar/shopping-cart.svg";
import order from "../../assets/navbar/shopping-cart.svg";
import user from "../../assets/navbar/circle-user-round.svg";
import { getItem, removeItem } from "../../utils/local_storage";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { fetchCart } from "../../pages/cart/helper/fecthCart";
import { useQuery } from "@tanstack/react-query";
import { Package } from "lucide-react";

const buttonVariants = {
  hover: {
    scale: 1.05,
    backgroundColor: "#dce2f7",
    color: "#FFFFFF",
    transition: { duration: 0.2 },
  },
  tap: {
    scale: 0.95,
  },
};

const navLinkVariants = {
  hover: {
    scale: 1.1,
    color: "#00008B",
    transition: { duration: 0.2 },
  },
  tap: {
    scale: 0.95,
  },
};

const navContents = [
  { title: "Home", route: "/" },
  { title: "Services", route: "/service" },
  { title: "Blog", route: "/blogs" },
  { title: "Contact Us", route: "/contact" },
];

const Navbar = ({ logo }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [totalCartItems, setTotalCartItems] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const localStorageName = getItem("name");
  const localStorageRole = getItem("role");
  const token = getItem("token");

  const params = {
    user_id: getItem("userId"),
  };

  const { data: cartProducts } = useQuery({
    queryKey: ["cart_products"],
    queryFn: () => fetchCart({ params }),
  });

  useEffect(() => {
    const user = getItem("token");
    if (cartProducts && user) {
      setTotalCartItems(cartProducts?.items?.length);
    } else {
      setTotalCartItems(0);
    }
  }, [cartProducts]);

  const handleLogoClick = () => {
    navigate("/");
  };

  const onLogoutUser = () => {
    removeItem("token");
    removeItem("userId");
    removeItem("role");
    removeItem("name");
    setIsUserLoggedIn(false);
    setTotalCartItems(0);
    toast.success("Logout successful!");
    navigate("/");
  };

  const onLoginUser = () => {
    navigate("/login");
  };

  const handleCartClick = () => {
    if (!isUserLoggedIn) {
      toast.error("Please login to view cart");
      navigate("/login");
    } else {
      navigate("/cart");
    }
  };

  const handleOrderClick = () => {
    if (!isUserLoggedIn) {
      toast.error("Please login to view orders");
      navigate("/login");
    } else {
      navigate("/order");
    }
  };

  useEffect(() => {
    if (token) {
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false);
    }
  }, [token]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="bg-[#FBF6F166] px-6 py-3 flex items-center justify-between relative">
      <div className="flex items-center gap-1.5" onClick={handleLogoClick}>
        <img
          src={logo}
          alt="Logo"
          className="h-[40px] w-[40px] cursor-pointer"
        />
        <p className="text-[#1C0547] font-semibold text-xl leading-none">
          <span className="text-[#00008B]">CRM</span>
        </p>
      </div>

      <div className="hidden md:flex justify-evenly rounded-3xl bg-[#F6F3F3] items-center">
        {navContents.map((n) => (
          <motion.div
            key={n.route}
            variants={navLinkVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <NavLink
              to={n.route}
              className={({ isActive }) =>
                `text-lg font-semibold px-3 py-2 ${
                  isActive ? "text-[#00008B] underline" : ""
                } whitespace-nowrap`
              }
            >
              {n.title}
            </NavLink>
          </motion.div>
        ))}
      </div>

      <div className="hidden md:flex items-center gap-3">
        {token && localStorageRole && localStorageRole !== "user" && (
          <span className="px-4 py-3 bg-yellow-500 text-[#00008B] text-[0.85rem] rounded-full">
            {localStorageRole?.toUpperCase()}
          </span>
        )}
        <motion.button
          onClick={handleOrderClick}
          className="flex items-center border-2 border-[#00008B] gap-1.5 px-4 py-2 rounded-full"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <Package className="text-[#00008B]" />
          <motion.span className="text-[#00008B] font-medium text-md whitespace-nowrap">
            My Orders
          </motion.span>
        </motion.button>

        <motion.button
          onClick={handleCartClick}
          className="relative flex items-center border-2 border-[#00008B] gap-1.5 px-4 py-2 rounded-full"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <img src={cart} alt="Cart" className="h-[23px] w-[23px]" />
          {isUserLoggedIn && (
            <div className="w-6 h-6 rounded-full absolute bg-blue-900 -top-2 -right-1 flex items-center justify-center">
              <span className="text-gray-50 text-xs">
                {totalCartItems || 0}
              </span>
            </div>
          )}
          <motion.span className="text-[#00008B] font-medium text-md">
            Cart
          </motion.span>
        </motion.button>

        {!isUserLoggedIn ? (
          <button
            onClick={onLoginUser}
            className="flex items-center border border-black gap-1.5 px-4 py-2 bg-[#00008B] rounded-full"
          >
            <img src={user} alt="User" className="h-[23px] w-[23px]" />
            <span className="text-[#FFFFFF] text-md">Login</span>
          </button>
        ) : (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center border border-black gap-1.5 px-4 py-2 bg-[#00008B] rounded-full"
            >
              <img src={user} alt="User" className="h-[23px] w-[23px]" />
              <span className="text-[#FFFFFF] text-md">{localStorageName}</span>
              <FiChevronDown className="text-[#FFFFFF]" />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-12 right-0 bg-white shadow-md rounded-md w-40 z-50">
                <button
                  onClick={() => navigate("/edit-profile")}
                  className="w-full text-left px-4 py-2 text-[#00008B] hover:bg-gray-100"
                >
                  Edit Profile
                </button>
                <button
                  onClick={onLogoutUser}
                  className="w-full text-left px-4 py-2 text-[#00008B] hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
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
                `block text-lg font-semibold py-3 w-full text-center ${
                  isActive ? "text-[#00008B] underline" : ""
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              {n.title}
            </NavLink>
          ))}

          <div className="flex flex-col items-center gap-3 py-4">
            <button
              onClick={handleCartClick}
              className="flex items-center text-[#00008B] gap-1.5 px-4 py-2 rounded-full"
            >
              <span className="text-[#00008B] font-medium text-lg">Cart</span>
            </button>

            {isUserLoggedIn ? (
              <button
                onClick={onLogoutUser}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full"
              >
                <span className="text-[#00008B] font-medium text-lg">
                  Logout
                </span>
              </button>
            ) : (
              <button
                onClick={onLoginUser}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full"
              >
                <span className="text-[#00008B] font-medium text-lg">
                  Login
                </span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
