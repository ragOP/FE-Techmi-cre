import { useNavigate } from "react-router-dom";
import contact from "../../assets/contact/conatct.png";
import { motion } from "framer-motion";
const posts = [
  {
    id: 1,
    category: "LAUNDRY & DRY CLEANING",
    author: "Jane Doe",
    time: "5 months ago",
    title: "Laundry Pickup And Delivery Services",
    company: "Washmart",
    image: contact,
  },
  {
    id: 2,
    category: "LAUNDRY & DRY CLEANING",
    author: "Jane Doe",
    time: "5 months ago",
    title: "Laundry Pickup And Delivery Services",
    company: "Washmart",
    image: contact,
  },
  {
    id: 5,
    category: "LAUNDRY & DRY CLEANING",
    author: "Jane Doe",
    time: "5 months ago",
    title: "Laundry Pickup And Delivery Services",
    company: "Washmart",
    image: contact,
  },
  {
    id: 4,
    category: "LAUNDRY & DRY CLEANING",
    author: "Jane Doe",
    time: "5 months ago",
    title: "Laundry Pickup And Delivery Services",
    company: "Washmart",
    image: contact,
  },
  {
    id: 5,
    category: "LAUNDRY & DRY CLEANING",
    author: "Jane Doe",
    time: "5 months ago",
    title: "Laundry Pickup And Delivery Services",
    company: "Washmart",
    image: contact,
  },
  {
    id: 5,
    category: "LAUNDRY & DRY CLEANING",
    author: "Jane Doe",
    time: "5 months ago",
    title: "Laundry Pickup And Delivery Services",
    company: "Washmart",
    image: contact,
  },
];

const latestPosts = [
  {
    id: 1,
    title: "How To Keep Your White And Bright Most delivery laundry",
    views: "4.9K",
    image: contact,
  },
  {
    id: 1,
    title: "How To Keep Your White And Bright Most delivery laundry",
    views: "4.9K",
    image: contact,
  },
  {
    id: 1,
    title: "How To Keep Your White And Bright Most delivery laundry",
    views: "4.9K",
    image: contact,
  },
  {
    id: 1,
    title: "How To Keep Your White And Bright Most delivery laundry",
    views: "4.9K",
    image: contact,
  },
  {
    id: 1,
    title: "How To Keep Your White And Bright Most delivery laundry",
    views: "4.9K",
    image: contact,
  },
  // Duplicate for multiple items
];

export default function Blog() {
  const navigate = useNavigate();
  return (
    <motion.div
      className="p-8 bg-gray-100 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h1
        className="text-3xl font-bold text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        Insights, Ideas, and Inspiration
      </motion.h1>
      <motion.p
        className="text-center text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        Explore our latest stories, tips, and trends—crafted to inform, inspire,
        and spark your creativity.
      </motion.p>

      <div className="flex gap-6 mt-6">
        <motion.div
          className="w-[70%] grid grid-cols-2 gap-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              onClick={() => navigate(`/blogs/${post.id}`)}
              className="relative cursor-pointer rounded-3xl overflow-hidden shadow-lg"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 250 }}
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4 text-white">
                <motion.span
                  className="absolute top-5 bg-blue-500 text-xs px-2 py-1 rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 + index * 0.15, duration: 0.6 }}
                >
                  {post.category}
                </motion.span>
                <h3 className="text-lg font-semibold">{post.title}</h3>
                <p className="text-sm">
                  {post.author} • {post.time}
                </p>
                <p className="text-xs">{post.company}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="w-[30%]"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 1 }}
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

          <h2 className="mt-6 text-xl font-bold">Latest Post</h2>
          <motion.div className="mt-4 space-y-4">
            {latestPosts.map((post, index) => (
              <motion.div
                key={post.id}
                className="flex items-center bg-white shadow p-2 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.15, duration: 0.8 }}
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="ml-2 text-sm">
                  <p>{post.title}</p>
                  <span className="text-gray-500">{post.views} 👁️</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
