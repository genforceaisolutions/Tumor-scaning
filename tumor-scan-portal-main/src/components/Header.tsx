
import React from "react";
import { Brain } from "lucide-react";
import { motion } from "framer-motion";

const Header: React.FC = () => {
  return (
    <header className="w-full py-6 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute -top-10 left-6 opacity-10 text-tumor-blue"
          animate={{ 
            y: [0, 15, 0],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Brain size={120} />
        </motion.div>
        
        <motion.div 
          className="absolute top-10 right-6 opacity-10 text-tumor-darkBlue"
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, -5, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Brain size={80} />
        </motion.div>
      </div>
      
      <div className="max-w-4xl mx-auto flex items-center justify-center relative z-10">
        <motion.div 
          className="flex items-center space-x-2"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="w-10 h-10 rounded-full bg-tumor-blue flex items-center justify-center shadow-md"
            whileHover={{ 
              scale: 1.1, 
              boxShadow: "0 0 15px rgba(0, 149, 255, 0.5)" 
            }}
            transition={{ type: "spring", stiffness: 500 }}
          >
            <Brain className="w-5 h-5 text-white" />
          </motion.div>
          <motion.h1 
            className="text-2xl font-bold text-tumor-dark"
            whileHover={{ 
              scale: 1.05, 
              color: "#0095ff",
              transition: { duration: 0.2 }
            }}
          >
            TumorScan
          </motion.h1>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
