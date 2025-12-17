import React from "react";
import hero from "../assets/53094793.png";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <div className="flex items-center justify-between lg:px-28 py-12">
      <div>
        <h2 className="text-5xl text-primary font-bold">Fresh Homemade Food</h2>
        <p className="my-3">
          {" "}
          Delivered straight from Local Chefs to your Table. Delivered with
          Care. <br /> Cooked with Love by Local Chefs.
        </p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-primary text-[16px] text-black font-bold"
        >
          Order Now
        </motion.button>
      </div>
      <div className="h-[400px] w-[400px]">
        <motion.img
          iinitial={{ y: 0 }}
          animate={{ y: [0, -15, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          className="h-full w-full rounded-full shadow-2xl shadow-gray-700 object-cover"
          src={hero}
        />
      </div>
    </div>
  );
};

export default Banner;
