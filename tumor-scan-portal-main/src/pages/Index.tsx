
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ImageUploader from "@/components/ImageUploader";
import ResultDisplay from "@/components/ResultDisplay";
import Header from "@/components/Header";
import ProcessingAnimation from "@/components/ProcessingAnimation";
import { toast } from "@/hooks/use-toast";

// This is a mock function to simulate the API call to your backend
// Replace this with your actual API call
const analyzeBrainScan = async (imageFile: File): Promise<{
  prediction: string;
  confidence: number;
}> => {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Mock response - replace with actual API integration
  // For demo purposes, we'll return random results
  const results = [
    { prediction: "No Tumor Detected", confidence: 0.92 },
    { prediction: "Tumor Detected - Glioma", confidence: 0.87 },
    { prediction: "Tumor Detected - Meningioma", confidence: 0.78 },
    { prediction: "Tumor Detected - Pituitary", confidence: 0.83 }
  ];
  
  return results[Math.floor(Math.random() * results.length)];
};

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState<{
    prediction: string;
    confidence: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = async (file: File) => {
    setSelectedImage(file);
    setImageUrl(URL.createObjectURL(file));
    setIsProcessing(true);
    setShowResults(false);
    setResult(null);
    setError(null);
    
    try {
      // Call your backend API to analyze the image
      const analysisResult = await analyzeBrainScan(file);
      setResult(analysisResult);
      
      // Show success toast after animation
      toast({
        title: "Analysis Complete",
        description: analysisResult.prediction,
        variant: analysisResult.prediction.toLowerCase().includes("no tumor") ? "default" : "destructive",
      });
    } catch (err) {
      console.error("Error analyzing image:", err);
      setError("We couldn't process this image. Please try uploading a different brain scan image.");
      
      // Show error toast
      toast({
        title: "Analysis Failed",
        description: "There was an error processing your image",
        variant: "destructive",
      });
    } finally {
      // Processing animation will handle setting isProcessing to false
    }
  };

  const handleAnimationComplete = () => {
    setIsProcessing(false);
    setShowResults(true);
  };

  const handleReset = () => {
    setSelectedImage(null);
    setImageUrl(null);
    setResult(null);
    setError(null);
    setShowResults(false);
  };

  // Clean up URL objects when component unmounts or when image changes
  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  // Define animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-tumor-lightGray">
      <Header />
      
      <main className="container px-4 py-10 max-w-4xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          <motion.div variants={itemVariants} className="mb-6 text-center">
            <div className="inline-block mb-2 px-3 py-1 bg-tumor-blue/10 rounded-full">
              <span className="text-xs font-medium text-tumor-blue">BRAIN SCAN ANALYSIS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold hero-text-gradient mb-3">
              Brain Tumor Scanner
            </h2>
            <p className="text-tumor-mediumGray max-w-md mx-auto">
              Upload a brain MRI scan image to detect the presence of tumors with advanced AI analysis.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="w-full max-w-md">
            <ImageUploader 
              onImageSelect={handleImageSelect}
              isProcessing={isProcessing}
              isSuccess={!isProcessing && !!result && !error}
              isError={!!error}
            />
          </motion.div>

          {/* Processing animation */}
          <ProcessingAnimation 
            isProcessing={isProcessing} 
            imageUrl={imageUrl}
            onComplete={handleAnimationComplete}
          />

          <motion.div 
            variants={itemVariants}
            className="w-full"
          >
            <ResultDisplay 
              result={result}
              isVisible={showResults && (!!result || !!error)}
              onReset={handleReset}
              error={error || undefined}
            />
          </motion.div>
        </motion.div>
      </main>
      
      <footer className="py-6 text-center text-tumor-mediumGray text-sm">
        <p>© {new Date().getFullYear()} TumorScan. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
