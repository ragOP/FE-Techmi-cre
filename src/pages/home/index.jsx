import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Tagline from "../../components/home/tagline";
import FeaturedProducts from "../../components/home/featured_products";
import DiscountBanner from "../../components/home/discount_banner";
import SellingServices from "../../components/home/Selling_Services";
import Solutions from "../../components/home/Care_Solutions";
import Productoffer from "../../components/home/Product_Offer";
import OrderedMed from "../../components/home/Ordered_Med";
import CategoryGrid from "../../components/home/Categ_Options";

const Home = () => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Tagline */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }} // Only animate once
        >
          <Tagline />
        </motion.div>

        {/* CategoryGrid */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <CategoryGrid />
        </motion.div>

        {/* FeaturedProducts */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <FeaturedProducts />
        </motion.div>

        {/* DiscountBanner */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <DiscountBanner />
        </motion.div>

        {/* SellingServices */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <SellingServices />
        </motion.div>

        {/* Solutions */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Solutions />
        </motion.div>

        {/* OrderedMed */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <OrderedMed />
        </motion.div>

        {/* Productoffer */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Productoffer />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Home;