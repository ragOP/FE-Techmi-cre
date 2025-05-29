import { Clock, Phone, PinIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import contact from "../../assets/contact/conatct.png";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { submitQueryForm } from "./helper";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import CartLoader from "../../components/loader/CartLoader";

const position = [28.5691, 77.2786];

const Contact = ({ footerConfig }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [errors, setErrors] = useState({ name: "", email: "", subject: "" });

  const { mutate: submitQuery, isPending } = useMutation({
    mutationFn: async (formData) => {
      return await submitQueryForm(formData);
    },
    onSuccess: () => {
      toast.success("Form submitted successfully");
      setName("");
      setEmail("");
      setSubject("");
    },
  });

  const validateFields = () => {
    let valid = true;
    const newErrors = { name: "", email: "", subject: "" };

    // Name: No special symbols
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      newErrors.name = "Name must not contain special characters like #, $, %, etc. or Numbers.";
      valid = false;
    }

    // Email: Valid format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Not a valid email address.";
      valid = false;
    }

    // Subject/Message: Minimum 10 characters
    if (subject.trim().length < 10) {
      newErrors.subject = "Message must be at least 10 characters long.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!name || !email || !subject) {
      toast.error("Please fill all the fields");
      return;
    }

    const isValid = validateFields();
    if (!isValid) return;

    const formData = { name, email, subject };
    submitQuery(formData);
  };

  useEffect(() => {
    if (!mapInstance.current) {
      mapInstance.current = L.map(mapRef.current, {
        center: position,
        zoom: 12,
        scrollWheelZoom: false,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstance.current);

      const markerIcon = L.icon({
        iconUrl: "/path-to-your-pin-icon.png",
        iconSize: [50, 50],
        iconAnchor: [25, 50],
      });

      const marker = L.marker(position, { icon: markerIcon }).addTo(
        mapInstance.current
      );
      marker.bindPopup("farish, ka ghar").openPopup();

      marker._icon.classList.add("bouncing-marker");

      setMapLoaded(true);
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);
  return (
    <motion.div
      className="max-w-7xl mx-auto px-6 py-10 md:px-10"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Title Section */}
      <motion.h2
        className="text-2xl md:text-3xl font-bold text-center text-gray-900"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        Get in Touch with Our Team
      </motion.h2>
      <motion.p
        className="text-md md:text-lg text-center text-gray-600 mt-2"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Visit, call, or drop us a message—we’re just around the corner!
      </motion.p>

      {/* Map & Location Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mt-10">
        <motion.div
          className="overflow-hidden rounded-lg shadow-md relative w-full h-[250px] md:h-[350px]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1 }}
        >
          <div ref={mapRef} className="w-full h-full rounded-lg"></div>
          {!mapLoaded && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl text-gray-500 opacity-70">
              Loading map...
            </div>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1 }}
        >
          <h3 className="text-xl md:text-2xl font-semibold text-gray-800 text-center md:text-left">
            Your Locations, Your Connection
          </h3>
          <div className="grid grid-cols-3 gap-6 text-gray-700 mt-6">
            {["Mumbai", "Ratnagiri", "Delhi"].map((city, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.2, duration: 1 }}
              >
                <h4 className="font-semibold text-gray-900">| {city}</h4>
                <p className="text-sm md:text-base">
                  Location 1<br /> Location 2<br /> Location 3 <br /> Location 4{" "}
                  <br /> Location 5 <br /> Location 6
                </p>
              </motion.div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row items-center sm:justify-between mt-8 gap-6">
            {[
              { icon: Phone, text: footerConfig?.phoneNumber },
              {
                icon: PinIcon,
                text: footerConfig?.address,
              },
              { icon: Clock, text: footerConfig?.timming },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center sm:items-start w-full sm:w-[30%]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 + index * 0.2, duration: 1 }}
              >
                <item.icon className="w-5 h-5 text-blue-800" />
                <p className="mt-2 text-gray-800 text-center sm:text-left">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Contact Form Section */}
      <div className="mt-14 flex flex-col md:flex-row items-center gap-8">
        <motion.div
          className="w-full md:w-[45%]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <h3 className="text-xl md:text-2xl font-semibold text-gray-900 text-center md:text-left">
            We’d Love to Hear from You!
          </h3>
          <p className="text-gray-600 mt-2 text-center md:text-left">
            Have questions or ideas to share? We’re just a message away—let’s
            create something amazing together.
          </p>
          <form className="mt-6 space-y-6">
            <motion.input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 1 }}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
            <motion.input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 1 }}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
            <motion.textarea
              placeholder="Your Message"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 h-28 text-sm md:text-base"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7, duration: 1 }}
            />
            {errors.subject && (
              <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={handleSubmitForm}
              className={`${
                isPending ? "pointer-events-none" : ""
              } w-full bg-blue-900 text-white p-3 rounded-3xl font-semibold text-sm md:text-lg hover:bg-blue-700 transition-all`}
            >
              {isPending ? (
                <div className="my-2">
                  <CartLoader />
                </div>
              ) : (
                "Submit Message"
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Contact Image */}
        <motion.div
          className="w-full md:w-[55%] flex justify-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 1 }}
        >
          <img
            className="w-[90%] md:w-[100%] rounded-lg"
            src={contact}
            alt="Contact Us"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact;
