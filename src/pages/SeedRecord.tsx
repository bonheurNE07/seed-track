import React, { useState } from 'react';
import ImageUpload from '../components/ImageUpload';

const SeedRecord:React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  
  const handleImageSelect = (file: File) => {
      setImageFile(file);
    };

  return (
    <div className="min-h-screen w-full bg-white dark:bg-transparent  text-gray-900 dark:text-white px-4 py-8 md:px-12">
      {/* Upload Section */}
      <ImageUpload onImageSelect={handleImageSelect} />

      <h4>{ imageFile ?  "Hello" : "No no" }</h4>

      {/* Separator */}
      <hr className="my-6 border-gray-300 dark:border-gray-600" />

      {/* Species */}
      <section className="space-y-4">
        <h2 className="text-center text-lg font-semibold">SPECIES</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select className="input-style"><option>Selected Species</option></select>
          <select className="input-style"><option>Selected Quantity</option></select>
        </div>
      </section>

      {/* Action Buttons */}
      <div className="flex justify-center mt-8 gap-2">
        <button className="px-6 py-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700">Add</button>
        <button className="px-6 py-2 text-blue-600 rounded-full hover:underline">Submit</button>
      </div>
      {/* Separator */}
      <hr className="my-6 border-gray-300 dark:border-gray-600" />

      {/* Farmer Identity */}
      <section className="space-y-4">
        <h2 className="text-center text-lg font-semibold">FARMER IDENTITY</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex flex-col text-sm text-gray-700 dark:text-gray-300">
            Date
            <input type="date" className="input-style" />
          </label>

          <label className="flex flex-col text-sm text-gray-700 dark:text-gray-300">
            Birth Date
            <input type="date" className="input-style" />
          </label>
          <input type="text" placeholder="Names" className="input-style" />
          <input type="text" placeholder="Sex" className="input-style" />
          <input type="text" placeholder="National ID" className="input-style" />
          <input type="text" placeholder="Phone number" className="input-style" />
        </div>
      </section>

      <hr className="my-6 border-gray-300 dark:border-gray-600" />

      {/* Farm Location */}
      <section className="space-y-4">
        <h2 className="text-center text-lg font-semibold">FARM LOCATION</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select className="input-style"><option>Select Cell ID</option></select>
          <select className="input-style"><option>Selected District</option></select>
          <select className="input-style"><option>Selected Province</option></select>
          <select className="input-style"><option>Selected Cellule</option></select>
          <select className="input-style"><option>Selected Sector</option></select>
          <select className="input-style"><option>Selected Village</option></select>
        </div>
      </section>
    </div>
  );
};

export default SeedRecord;


