
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Trash2, AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  isProcessing: boolean;
  isSuccess?: boolean;
  isError?: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageSelect,
  isProcessing,
  isSuccess = false,
  isError = false,
}) => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPG, PNG, etc.)",
        variant: "destructive",
      });
      return;
    }

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB",
        variant: "destructive",
      });
      return;
    }

    setImage(file);
    onImageSelect(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const clearImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImage(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        className="hidden"
        accept="image/*"
        disabled={isProcessing}
      />

      <div 
        onClick={!isProcessing ? triggerFileInput : undefined}
        className={cn(
          "relative w-full aspect-square rounded-2xl overflow-hidden transition-all duration-300 animate-fade-in",
          "border-2 border-dashed flex flex-col items-center justify-center p-6 text-center cursor-pointer",
          "bg-tumor-lightGray hover:bg-gray-100 focus-ring",
          isProcessing && "opacity-75 cursor-not-allowed",
          isSuccess && "border-green-400 bg-green-50",
          isError && "border-red-400 bg-red-50"
        )}
      >
        {preview ? (
          <div className="relative w-full h-full">
            <img
              src={preview}
              alt="Preview"
              className={cn(
                "w-full h-full object-contain rounded animate-scale-in",
                isProcessing && "opacity-50"
              )}
            />
            {!isProcessing && (
              <button
                onClick={clearImage}
                className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white shadow-md transition-all hover:scale-105 focus-ring"
                aria-label="Remove image"
              >
                <Trash2 className="w-5 h-5 text-red-500" />
              </button>
            )}
          </div>
        ) : (
          <>
            <div className={cn(
              "w-24 h-24 mb-4 rounded-full bg-white flex items-center justify-center shadow-sm",
              "transition-transform duration-300 group-hover:scale-110"
            )}>
              {isError ? (
                <AlertCircle className="w-12 h-12 text-red-500 animate-pulse-subtle" />
              ) : isSuccess ? (
                <CheckCircle2 className="w-12 h-12 text-green-500 animate-pulse-subtle" />
              ) : (
                <Upload className="w-12 h-12 text-tumor-blue animate-pulse-subtle" />
              )}
            </div>
            <h3 className="text-xl font-semibold text-tumor-dark mb-2">
              {isError ? "Error Processing Image" : isSuccess ? "Analysis Complete" : "Select an Image to Analyze"}
            </h3>
            <p className="text-tumor-mediumGray mb-6 max-w-xs">
              {isError 
                ? "Please try uploading a different brain scan image" 
                : isSuccess 
                ? "View your results below" 
                : "Upload a brain scan image for tumor detection"}
            </p>
            {!isProcessing && !isSuccess && !isError && (
              <Button 
                className="bg-tumor-blue hover:bg-tumor-darkBlue transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
              >
                Choose Image
              </Button>
            )}
          </>
        )}

        {isProcessing && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full border-4 border-tumor-blue/30 border-t-tumor-blue animate-spin mb-4"></div>
              <p className="text-tumor-dark font-medium">Processing Image...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
