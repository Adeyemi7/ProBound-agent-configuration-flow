'use client';

import { useState, ChangeEvent, useRef } from 'react';
import { Upload, Trash2, ChevronDown } from 'lucide-react';
import Image from 'next/image';

export default function IdentityForm() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 1. Handle File Upload
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);
    }
  };

  // 2. Handle Remove Image
  const handleRemoveImage = () => {
    setImagePreview(null);
    // Reset the file input so the same file can be selected again if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="animate-in fade-in max-w-2xl">
      <h1 className="text-2xl text-[rgba(11,6,26,1)] font-semibold">
        Agent Identity
      </h1>
      <p className="text-sm text-[rgba(113,113,122,1)] mb-8 mt-2">
        Give your agent an identity
      </p>

      <div className="space-y-6">
        {/* Agent Picture Section */}
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          {/* Image Preview Box */}
          <div className="w-[107px] h-[85px] bg-[rgba(243,244,246,1)] border-2 border border-[rgba(228,228,231,1)] rounded-lg flex-shrink-0 overflow-hidden relative flex items-center justify-center">
            {imagePreview ? (
              <Image
                src={imagePreview}
                alt="Agent Preview"
                fill
                className="object-contain"
              />
            ) : (
              <span className="text-xs text-gray-400">No image</span>
            )}
          </div>

          {/* Controls */}
          <div className="flex-1">
            <label className="block text-base font-medium text-[rgba(21,32,43,1)] mb-3">
              Agent Picture
            </label>

            <div className="flex items-center gap-3 mb-2">
              {/* Upload Button */}
              <label className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-[#E6E8EB] hover:bg-gray-300 text-[rgba(21,32,43,1)] text-sm font-medium rounded-md transition-colors select-none">
                <Upload size={16} />
                Upload image
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="image/png, image/jpeg, image/gif"
                  onChange={handleImageUpload}
                />
              </label>

              {/* Remove Button */}
              <button
                onClick={handleRemoveImage}
                disabled={!imagePreview}
                className={`flex items-center gap-2 px-4 py-2 border rounded-md text-sm font-medium transition-colors
                  ${
                    imagePreview
                      ? 'bg-white border-gray-200 hover:bg-gray-50 text-gray-500 cursor-pointer'
                      : 'bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed'
                  }
                `}
              >
                <Trash2 size={16} />
                Remove
              </button>
            </div>

            <p className="text-xs text-gray-400">
              We support PNGs, JPEGs and GIFs under 10MB
            </p>
          </div>
        </div>

        {/* Agent Voice */}
        <div>
          <label className="block text-sm font-medium text-[rgba(21,32,43,1)] mb-2">
            Agent Voice
          </label>
          <div className="relative">
            <select className="block w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-500 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400">
              <option value="" disabled selected>
                Select voice
              </option>
              <option value="voice1">Voice 1</option>
              <option value="voice2">Voice 2</option>
            </select>
            <ChevronDown
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              size={16}
            />
          </div>
        </div>

        {/* Agent Language */}
        <div>
          <label className="block text-sm font-medium text-[rgba(21,32,43,1)] mb-2">
            Agent Language
          </label>
          <div className="relative">
            <select className="block w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-500 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400">
              <option value="" disabled selected>
                Choose default language
              </option>
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>
            <ChevronDown
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              size={16}
            />
          </div>
        </div>

        {/* Agent Name */}
        <div>
          <label className="block text-sm font-medium text-[rgba(21,32,43,1)] mb-2">
            Agent Name
          </label>
          <input
            type="text"
            placeholder="Name your Agent"
            className="block w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-[rgba(21,32,43,1)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400"
          />
        </div>
      </div>
    </div>
  );
}