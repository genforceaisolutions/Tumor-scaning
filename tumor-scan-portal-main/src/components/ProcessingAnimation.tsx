import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MriMachineAnimation from './MriMachineAnimation';

interface ProcessingAnimationProps {
  isProcessing: boolean;
  imageUrl: string | null;
  onComplete: () => void;
}

const ProcessingAnimation: React.FC<ProcessingAnimationProps> = ({ 
  isProcessing, 
  imageUrl, 
  onComplete 
}) => {
  const [progress, setProgress] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);
  
  useEffect(() => {
    if (isProcessing && imageUrl) {
      setShowAnimation(true);
      
      // Reset progress when we start processing
      setProgress(0);
      
      // Animate progress over 3 seconds
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 0.01;
          if (newProgress >= 1) {
            clearInterval(interval);
            
            // Keep the animation visible for 1 more second after completion
            setTimeout(() => {
              setShowAnimation(false);
              onComplete();
            }, 1000);
            
            return 1;
          }
          return newProgress;
        });
      }, 30);
      
      return () => clearInterval(interval);
    }
  }, [isProcessing, imageUrl, onComplete]);

  if (!showAnimation) return null;
  
  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm"
      >
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-3xl px-4"
        >
          <MriMachineAnimation 
            imageUrl={imageUrl} 
            animationProgress={progress}
            isVisible={true}
          />
          
          <div className="mt-8 text-center">
            <h3 className="text-xl font-semibold text-white mb-3">
              Analyzing Brain Scan
            </h3>
            
            <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4 overflow-hidden">
              <motion.div 
                className="bg-tumor-blue h-2.5 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${progress * 100}%` }}
                transition={{ ease: "easeInOut" }}
              />
            </div>
            
            <p className="text-tumor-lightGray">
              {progress < 0.3 ? (
                "Preparing scan for analysis..."
              ) : progress < 0.6 ? (
                "Detecting tissue anomalies..."
              ) : progress < 0.9 ? (
                "Applying deep learning models..."
              ) : (
                "Completing analysis..."
              )}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProcessingAnimation;
