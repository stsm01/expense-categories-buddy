
import React, { useState, useRef } from 'react';
import { Upload, X, FileText, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface FileUploadProps {
  onFileChange: (file: File | null) => void;
  accept?: string;
  maxSize?: number; // in MB
  className?: string;
  existingUrl?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileChange,
  accept = 'image/*,.pdf',
  maxSize = 5, // 5MB default
  className = '',
  existingUrl,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(existingUrl || null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (selectedFile: File | null) => {
    setError(null);
    
    if (!selectedFile) {
      setFile(null);
      setPreview(existingUrl || null);
      onFileChange(null);
      return;
    }
    
    // Validate file size
    if (selectedFile.size > maxSize * 1024 * 1024) {
      setError(`File size exceeds ${maxSize}MB limit`);
      return;
    }
    
    setFile(selectedFile);
    onFileChange(selectedFile);
    
    // Create preview for images
    if (selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      // For non-image files like PDFs
      setPreview(null);
    }
    
    toast({
      title: "File uploaded",
      description: `${selectedFile.name} has been successfully uploaded.`,
    });
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };
  
  const removeFile = () => {
    setFile(null);
    setPreview(null);
    onFileChange(null);
    
    // Reset file input value
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const handleButtonClick = () => {
    // Programmatically click the file input
    fileInputRef.current?.click();
  };
  
  const isImage = file?.type.startsWith('image/') || (preview && existingUrl);
  const isPdf = file?.type === 'application/pdf';
  
  return (
    <div className={`w-full ${className}`}>
      {!file && !preview ? (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            isDragging 
              ? 'border-primary bg-primary/5' 
              : 'border-border hover:border-primary/50 hover:bg-secondary/50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center space-y-3">
            <Upload className="h-10 w-10 text-muted-foreground" />
            <div className="space-y-1">
              <p className="text-sm font-medium">Drag & drop or click to upload</p>
              <p className="text-xs text-muted-foreground">
                {accept === 'image/*,.pdf' 
                  ? 'Images or PDF files' 
                  : accept.split(',').join(' or ')} (Max {maxSize}MB)
              </p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept={accept}
              onChange={(e) => handleFileChange(e.target.files ? e.target.files[0] : null)}
            />
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              className="mt-2"
              onClick={handleButtonClick}
            >
              Select file
            </Button>
          </div>
        </div>
      ) : (
        <div className="relative bg-secondary rounded-lg p-4">
          <div className="flex items-center">
            {isImage && preview ? (
              <div className="relative w-16 h-16 mr-4 rounded-md overflow-hidden bg-background">
                <img 
                  src={preview}
                  alt="File preview" 
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="flex items-center justify-center w-16 h-16 mr-4 rounded-md bg-background text-foreground">
                <FileText className="w-8 h-8" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {file?.name || 'Uploaded file'}
              </p>
              <p className="text-xs text-muted-foreground">
                {file ? `${(file.size / 1024 / 1024).toFixed(2)}MB` : 'File attached'}
              </p>
              <div className="flex items-center mt-1">
                <Check className="w-3.5 h-3.5 text-green-500 mr-1" />
                <span className="text-xs text-green-500">Ready to submit</span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={removeFile}
              className="ml-2 h-8 w-8 rounded-full hover:bg-destructive/10 hover:text-destructive"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
      
      {error && (
        <div className="mt-2 text-sm text-destructive flex items-center">
          <AlertCircle className="h-4 w-4 mr-1" />
          {error}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
