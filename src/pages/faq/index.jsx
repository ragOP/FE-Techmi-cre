import React, { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import {getFaqs} from "./helpers/getFaqs";
import LoadingSpinner from "../../components/loader/LoadingSpinner";

const FaqItem = ({ question, answer }) => {
  return (
    <motion.details
      className="bg-white p-4 rounded-lg shadow-md cursor-pointer"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <summary className="font-semibold text-lg">{question}</summary>
      <div
        className="mt-2 text-gray-700 text-sm leading-relaxed"
        dangerouslySetInnerHTML={{ __html: answer }}
      />
    </motion.details>
  );
};

const FaqPage = () => {
  const { data: faqRes = [], isLoading } = useQuery({
    queryKey: ["faqs"],
    queryFn: getFaqs,
  });

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 ">
      <h1 className="text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h1>
      <div className="space-y-4">
        {isLoading ? (
          <LoadingSpinner />
        ) : (Array.isArray(faqRes) &&
          faqRes.map((faq) => (
            <FaqItem key={faq._id} question={faq.question} answer={faq.answer} />
          ))
        )}
      </div>
    </div>
  );
};

export default FaqPage;
