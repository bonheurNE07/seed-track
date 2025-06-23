import React, { useRef, useState } from 'react';

interface ImageUploadProps {
  onImageSelect: (image: File) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      onImageSelect(file);
    }
  };

  const openGalleryPicker = () => {
    fileInputRef.current?.click();
  };

  const openCamera = () => {
    cameraInputRef.current?.click();
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      onImageSelect(file);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4 px-4">
      <h1 className="text-center text-2xl font-bold mb-4">Upload or Capture an ID</h1>
      {/* Toggle Buttons */}
      <div className="flex w-full bg-gray-100 hover:bg-gray-200 rounded-full overflow-hidden dark:bg-gray-800 dark:hover:bg-gray-900 shadow-md">
        <button
          onClick={openGalleryPicker}
          className="w-1/2 px-4 py-2 text-sm rounded-full font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
        >
          Upload an ID
        </button>
        <button
          onClick={openCamera}
          className="w-1/2 px-4 py-2 text-sm font-semibold text-blue-600 bg-gray-100 hover:bg-gray-200 dark:bg-transparent dark:text-white dark:hover:bg-transparent"
        >
          Capture
          <input
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={handleFileChange}
            ref={cameraInputRef}
          />
        </button>
      </div>

      {/* Dropzone */}
      <label
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            JPG, PNG, GIF (max. 800x400px)
          </p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          ref={fileInputRef}
        />
      </label>

      {/* Hidden input for camera */}
      <input
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileChange}
        ref={cameraInputRef}
      />

      {/* Image Preview */}
      {preview && (
        <div className="mt-4">
          <p className="text-center text-sm text-gray-500 dark:text-gray-300 mb-2">Preview:</p>
          
          <div className="w-full h-48 sm:h-72 md:h-80 rounded-xl overflow-hidden shadow-md border border-gray-300 dark:border-gray-700">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full sm:h-72 md:h-80  object-fit object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
