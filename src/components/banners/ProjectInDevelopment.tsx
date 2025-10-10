"use client";
import React, { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react"; // animate out

const BANNER_HEIGHT = 48; // px (approx. h-12, adjust if needed)

const ProjectInDevelopment: React.FC = () => {
  const [visible, setVisible] = useState(true);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="development-banner"
          className="w-full fixed top-0 left-0 z-50"
          initial={{ y: -BANNER_HEIGHT }}
          animate={{ y: 0 }}
          exit={{ y: -BANNER_HEIGHT }}
          transition={{ type: "spring", stiffness: 400, damping: 40 }}
          style={{ height: BANNER_HEIGHT }}
        >
          <div className="flex items-center justify-between bg-red-600 text-white px-6 py-2 shadow h-full">
            <span className="font-semibold text-sm">
              🚧 This project is in active development. Features may change or
              be unstable.
            </span>
            <button
              aria-label="Close banner"
              className="ml-4 hover:bg-black hover:cursor-pointer rounded-sm p-1 transition-colors"
              onClick={() => setVisible(false)}
              type="button"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectInDevelopment;
