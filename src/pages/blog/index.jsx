import { useNavigate } from "react-router-dom";
import contact from "../../assets/contact/conatct.png";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getBlogData } from "./helper";
import { useEffect, useState } from "react";
import { timeAgo } from "../../utils/check_date_diffrence";

export default function Blog() {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [latestPosts, setLatestPost] = useState([]);

  const params = {
    featured: true,
  };


  const { data: blogData, isLoading } = useQuery({
    queryKey: ["blog_data_featured"],
    queryFn: () => getBlogData({ params }),
    select: (data) => data?.response?.data,
  });

  const { data: latestBlog, isPending } = useQuery({
    queryKey: ["blog_data"],
    queryFn: () => getBlogData({ }),
    select: (data) => data?.response?.data,
  });

  useEffect(() => {
    if (latestBlog) {
      setLatestPost(latestBlog);
    }
  }, [latestBlog]);

  useEffect(() => {
    if (blogData) {
      setPosts(blogData);
    }
  }, [blogData]);

  return (
    <motion.div
      className="p-4 md:p-8 bg-gray-100 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h1
        className="text-2xl md:text-3xl font-bold text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        Insights, Ideas, and Inspiration
      </motion.h1>
      <motion.p
        className="text-center text-gray-600 text-sm md:text-base"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        Explore our latest stories, tips, and trends—crafted to inform, inspire,
        and spark your creativity.
      </motion.p>
      <div className="flex flex-col md:flex-row gap-6 mt-6">
        <motion.div
          className="w-full md:w-[70%] grid grid-cols-1 sm:grid-cols-2 gap-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          {isLoading && posts.length === 0
            ? Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="relative rounded-2xl overflow-hidden shadow-lg bg-white p-4 animate-pulse"
                >
                  <div className="w-full h-[180px] bg-gray-300 rounded"></div>
                  <div className="absolute inset-0 flex flex-col justify-end p-4">
                    <div className="w-20 h-5 bg-gray-400 rounded mb-2"></div>
                    <div className="w-3/4 h-6 bg-gray-400 rounded mb-1"></div>
                    <div className="w-1/2 h-4 bg-gray-400 rounded"></div>
                  </div>
                </div>
              ))
            :  posts.length > 0 && posts.map((post, index) => (
                <motion.div
                  key={post._id}
                  onClick={() => navigate(`/blogs/${post._id}`)}
                  className="relative cursor-pointer rounded-2xl overflow-hidden shadow-lg"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 250 }}
                >
                  <img
                    src={post?.bannerImageUrl}
                    alt={post?.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
                    <motion.span
                      className="absolute top-5 left-5 bg-blue-500 text-xs px-2 py-1 rounded-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 + index * 0.15, duration: 0.6 }}
                    >
                      {post.category || "Uncategorised"}
                    </motion.span>
                    <div className="absolute bottom-5">
                      <h3 className="text-lg font-semibold">{post.title}</h3>
                      <p className="text-sm">
                        {post?.author?.name || "Unknown"} • {timeAgo(post.createdAt)}
                      </p>
                      <p className="text-xs">{post.company}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
        </motion.div>
        <motion.div
          className="w-full md:w-[30%]"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search here..."
              className="w-full border border-gray-300 p-2 rounded-lg"
            />
            <motion.button
              className="bg-blue-900 text-white px-4 py-2 rounded-lg"
              whileHover={{ scale: 1.03 }}
            >
              Search
            </motion.button>
          </div>

          <h2 className="mt-6 text-lg md:text-xl font-bold">Latest Posts</h2>
          <motion.div className="mt-4 space-y-4">
            {isPending && latestPosts && latestPosts.length === 0
              ? Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-white shadow p-2 rounded-lg cursor-pointer animate-pulse"
                  >
                    <div className="w-16 h-16 bg-gray-300 rounded-lg"></div>
                    <div className="ml-2 flex-1">
                      <div className="h-4 w-3/4 bg-gray-400 rounded mb-1"></div>
                      <div className="h-3 w-1/2 bg-gray-400 rounded"></div>
                    </div>
                  </div>
                ))
              :  latestPosts.length > 0 && latestPosts.map((post, index) => (
                  <motion.div
                    key={post._id}
                    onClick={() => navigate(`/blogs/${post._id}`)}
                    className="flex items-center bg-white shadow p-2 rounded-lg cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + index * 0.15, duration: 0.8 }}
                  >
                    <img
                      src={post.bannerImageUrl}
                      alt={post.title}
                      className="w-12 h-12 md:w-16 md:h-16 rounded-lg object-cover"
                    />
                    <div className="ml-2 text-sm">
                      <p>{post.title}</p>
                      <span className="text-gray-500 text-xs md:text-sm">
                        {post.short_description}
                      </span>
                    </div>
                  </motion.div>
                ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
