import React from "react";
import hero from "../assets/53094793.png";
import { motion } from "framer-motion";
import { Link } from "react-router";

const Banner = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-10 items-center justify-between lg:px-28 lg:py-16">
      <div>
        <h2 className="text-5xl text-primary font-bold">Fresh Homemade Food</h2>
        <p className="my-3">
          {" "}
          Delivered straight from Local Chefs to your Table. Delivered with
          Care. <br /> Cooked with Love by Local Chefs.
        </p>
        <Link to="/all-meals"
          className="btn btn-primary text-[16px] text-black font-bold"
        >
          Order Now
        </Link>
      </div>
      <div className="h-[420px] w-[420px]">
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
