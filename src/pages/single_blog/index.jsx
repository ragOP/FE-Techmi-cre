import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getSingleBlogData } from "./helper";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function SingleBlog() {
  const { id } = useParams();
  
  const { data: blog, isLoading } = useQuery({
    queryKey: ["blog_data", id], 
    queryFn: () => getSingleBlogData(id),
    select: (data) => data?.response?.data,
  });

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <motion.div
      className="container mx-auto p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {isLoading ? (
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-300 rounded-md w-2/3 mb-4"></div>
          <div className="h-5 bg-gray-200 rounded-md w-1/2 mb-6"></div>
          <div className="w-full h-60 bg-gray-300 rounded-lg shadow-md mb-6"></div>
          <div className="space-y-4">
            <div className="h-5 bg-gray-200 rounded-md w-full"></div>
            <div className="h-5 bg-gray-200 rounded-md w-5/6"></div>
            <div className="h-5 bg-gray-200 rounded-md w-3/4"></div>
            <div className="h-5 bg-gray-200 rounded-md w-2/3"></div>
          </div>
        </div>
      ) : (
        <>
          <motion.h1
            className="text-2xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {blog?.title}
          </motion.h1>

          <motion.p
            className="text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {blog?.short_description}
          </motion.p>

          <motion.div
            className="mt-6"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <img
              src={blog?.bannerImageUrl}
              alt={blog?.title}
              className="w-full max-h-[60vh] rounded-lg shadow-md"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {blog?.content ? (
              blog.content
                .replace(/\\n/g, "\n")
                .split(/\n{2,}/)
                .map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-gray-700 mt-4 leading-relaxed text-lg"
                  >
                    {paragraph}
                  </p>
                ))
            ) : (
              <p className="text-gray-500 italic">No content available.</p>
            )}
          </motion.div>
        </>
      )}
    </motion.div>
  );
}
