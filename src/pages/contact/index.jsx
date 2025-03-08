import { Clock, Phone, PinIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import contact from "../../assets/contact/conatct.png";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const position = [28.5691, 77.2786];

const Contact = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);

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
      className="max-w-7xl mx-auto p-10"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.h2
        className="text-3xl font-bold text-center text-gray-900"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        Get in Touch with Our Team
      </motion.h2>
      <motion.p
        className="text-lg text-center text-gray-600 mt-2"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Visit, call, or drop us a message—we’re just around the corner!
      </motion.p>

      <div className="grid md:grid-cols-2 gap-10 mt-10">
        <motion.div
          className="overflow-hidden rounded-lg shadow-md relative"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1 }}
        >
          <div
            ref={mapRef}
            style={{ height: "100%", width: "100%", borderRadius: "20px" }}
          ></div>
          {!mapLoaded && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl text-gray-500 opacity-70">
              Loading map...
            </div>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1 }}
        >
          <h3 className="text-2xl font-semibold text-gray-800">
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
                <p>
                  Location 1<br /> Location 2<br /> Location 3
                </p>
              </motion.div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-8">
            {[
              { icon: Phone, text: "+91 9578376478" },
              {
                icon: PinIcon,
                text: "123, Main Street, Chiplun, Maharashtra - 415283",
              },
              { icon: Clock, text: "Mon-Fri: 9AM - 6PM | Sat: 9AM - 4PM" },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex flex-col w-[30%]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 + index * 0.2, duration: 1 }}
              >
                <item.icon className="w-4 h-4 text-blue-800" />
                <p className="mt-2 text-gray-800">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <div className="mt-14 flex items-center gap-8">
        <motion.div
          className="w-[45%]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <h3 className="text-2xl font-semibold text-gray-900">
            We’d Love to Hear from You!
          </h3>
          <p className="text-gray-600 mt-2">
            Have questions or ideas to share? We’re just a message away—let’s
            create something amazing together.
          </p>
          <form className="mt-6 space-y-6">
            <motion.input
              type="text"
              placeholder="Your Name"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 1 }}
            />
            <motion.input
              type="email"
              placeholder="Your Email"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 1 }}
            />
            <motion.textarea
              placeholder="Your Message"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 h-28"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7, duration: 1 }}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="w-full bg-blue-900 text-white p-2 rounded-3xl font-semibold text-lg hover:bg-blue-700 transition-all"
            >
              Submit Message
            </motion.button>
          </form>
        </motion.div>
        <motion.div
          className="w-[55%]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 1 }}
        >
          <img className="w-[100%]" src={contact} alt="Contact Us" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact;
