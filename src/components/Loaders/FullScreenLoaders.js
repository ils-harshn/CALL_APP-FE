import React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Loaders.module.css";
import Logo from "../../images/logo.png";

const dropIn = {
  hidden: { y: "-100vh", opacity: 0 },
  visible: { y: "0", opacity: 1, transition: { duration: 0.5 } },
  exit: { y: "-100vh", opacity: 0, transition: { duration: 0.5 } },
};

export const FullScreenSpinner = () => {
  return createPortal(
    <AnimatePresence>
      <motion.div
        className="w-screen h-screen flex justify-center items-center fixed top-0 left-0 z-50 bg-white"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center mb-4">
            <img alt="Logo" src={Logo} />
            <h1 className="text-2xl text-slate-600">SpeakEasy</h1>
          </div>
          <div
            className={`${styles.spinner} w-6 h-6 border-4 rounded-full border-t-blue-300`}
          ></div>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};
