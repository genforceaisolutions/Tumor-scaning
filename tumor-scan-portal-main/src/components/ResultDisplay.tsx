
import React from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, Brain, Braces, FileText, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResultDisplayProps {
  result: {
    prediction: string;
    confidence: number;
    imageUrl?: string;
  } | null;
  isVisible: boolean;
  onReset: () => void;
  error?: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({
  result,
  isVisible,
  onReset,
  error
}) => {
  if (!isVisible) return null;

  if (error) {
    return (
      <div className="w-full max-w-md mx-auto mt-8 glass-panel p-6 animate-slide-up">
        <div className="flex items-center justify-center mb-4 text-red-500">
          <AlertCircle className="w-10 h-10" />
        </div>
        <h3 className="text-lg font-semibold text-center mb-3">Analysis Error</h3>
        <p className="text-tumor-mediumGray text-center mb-6">{error}</p>
        <div className="flex justify-center">
          <Button 
            onClick={onReset}
            className="bg-tumor-blue hover:bg-tumor-darkBlue transition-all duration-300"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!result) return null;

  const getResultColor = () => {
    const prediction = result.prediction.toLowerCase();
    if (prediction.includes("no tumor") || prediction.includes("negative")) {
      return "text-green-500";
    }
    return "text-red-500";
  };

  const getConfidenceLabel = (confidence: number) => {
    if (confidence >= 0.9) return "Very High";
    if (confidence >= 0.75) return "High";
    if (confidence >= 0.6) return "Moderate";
    if (confidence >= 0.4) return "Low";
    return "Very Low";
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8 glass-panel overflow-hidden animate-slide-up">
      <div className="px-6 pt-6">
        <div className="flex items-center mb-4">
          <Brain className="w-5 h-5 text-tumor-blue mr-2" />
          <h3 className="text-lg font-semibold">Analysis Results</h3>
        </div>
        
        <div className="rounded-lg bg-white p-4 mb-4 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-tumor-mediumGray">Prediction</span>
            <Braces className="w-4 h-4 text-tumor-mediumGray" />
          </div>
          <p className={cn("text-lg font-semibold", getResultColor())}>
            {result.prediction}
          </p>
        </div>
        
        <div className="rounded-lg bg-white p-4 mb-6 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-tumor-mediumGray">Confidence</span>
            <FileText className="w-4 h-4 text-tumor-mediumGray" />
          </div>
          <div className="space-y-2">
            <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-tumor-blue transition-all duration-1000 ease-out"
                style={{ width: `${(result.confidence || 0) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-tumor-mediumGray">
              <span>{Math.round((result.confidence || 0) * 100)}%</span>
              <span>{getConfidenceLabel(result.confidence || 0)}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex border-t border-gray-200 divide-x divide-gray-200">
        <Button 
          onClick={onReset}
          variant="ghost" 
          className="flex-1 rounded-none py-3 text-tumor-blue hover:bg-gray-50 transition-colors"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          New Scan
        </Button>
        
        {result.imageUrl && (
          <Button 
            variant="ghost" 
            className="flex-1 rounded-none py-3 text-tumor-blue hover:bg-gray-50 transition-colors"
            onClick={() => window.open(result.imageUrl, '_blank')}
          >
            Download Report
          </Button>
        )}
      </div>
    </div>
  );
};

export default ResultDisplay;
