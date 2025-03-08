import { useEffect } from "react";
import contact from "../../assets/contact/conatct.png";
import { motion } from "framer-motion";
export default function SingleBlog() {
  useEffect(() => {
    window.scroll(0, 0);
  }, [])
  return (
    <motion.div
      className="container mx-auto p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h1
        className="text-2xl font-bold"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Laundry Pickup And Delivery Services Advantages
      </motion.h1>
      <motion.p
        className="text-gray-600"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        Explore our latest stories, tips, and trends—crafted to inform, inspire,
        and spark your creativity.
      </motion.p>

      <motion.div
        className="mt-6"
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        <img
          src={contact}
          alt="Laundry Service"
          className="w-full max-h-[60vh] rounded-lg shadow-md"
        />
      </motion.div>

      <motion.h2
        className="text-xl font-bold mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.8 }}
      >
        The Benefits of a Pickup and Delivery Laundry Service
      </motion.h2>
      <motion.p
        className="text-gray-700 mt-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.8 }}
      >
        In this blog post, we’ll talk about the benefits of a pickup and
        delivery laundry service and why it might be the perfect solution for
        your laundry needs.
      </motion.p>

      {[
        {
          title: "Convenience",
          delay: 1.3,
          content:
            "One of the biggest advantages of a pickup and delivery laundry service is how convenient it is. You no longer need to find time in your busy schedule to do laundry or visit the laundromat. Instead, a professional service will come right to your door to pick up your laundry, saving you time and effort.",
        },
        {
          title: "Time-Saving",
          delay: 1.5,
          content:
            "Laundry can take up a lot of your time, especially if you have a big family or a busy life. With a pickup and delivery laundry service, you can save hours each week. Instead of using your free time to wash and fold clothes, you can focus on other important things or enjoy activities you love.",
        },
        {
          title: "Professional Quality",
          delay: 1.7,
          content:
            "When you use a professional laundry service like Care Sync, you can expect great quality and care. These services use the best machines and detergents to ensure your clothes are cleaned thoroughly and gently. Many services also offer special cleaning for delicate or tough-to-clean fabrics, helping your clothes last longer.",
        },
      ].map((section, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: section.delay, duration: 0.8 }}
        >
          <h3 className="text-lg font-semibold mt-4">{section.title}</h3>
          <p className="text-gray-700 mt-2">{section.content}</p>
        </motion.div>
      ))}

      <motion.h3
        className="text-lg font-semibold mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.9, duration: 0.8 }}
      >
        Conclusion
      </motion.h3>
      <motion.p
        className="text-gray-700 mt-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.1, duration: 0.8 }}
      >
        A pickup and delivery laundry service offers many benefits: convenience,
        time-saving, professional quality, customizable options,
        eco-friendliness, and cost-effectiveness. With Care Sync handling your
        clothes, you can focus on what really matters—spending time with your
        family, enjoying a hobby, or simply relaxing.
      </motion.p>
    </motion.div>
  );
}
