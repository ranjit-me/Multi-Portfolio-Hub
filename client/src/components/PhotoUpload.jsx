import React, { useState, useRef } from 'react';
import { Upload, X, Camera, User } from 'lucide-react';

const PhotoUpload = ({ 
  currentPhotoUrl, 
  onPhotoUpload, 
  onPhotoDelete, 
  photoType = 'profile', 
  label = 'Profile Photo',
  className = '' 
}) => {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = async (file) => {
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      alert('Please select a valid image file (JPEG, PNG, GIF, or WebP)');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setUploading(true);
    try {
      await onPhotoUpload(file);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload photo. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this photo?')) {
      setUploading(true);
      try {
        await onPhotoDelete();
      } catch (error) {
        console.error('Delete error:', error);
        alert('Failed to delete photo. Please try again.');
      } finally {
        setUploading(false);
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Only show label if not compact mode */}
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}

      {/* Compact mode layout */}
      {className.includes('compact') ? (
        <div className="flex items-center space-x-3">
          {/* Current Photo Display - Smaller */}
          {currentPhotoUrl ? (
            <div className="relative inline-block">
              <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200">
                <img
                  src={currentPhotoUrl}
                  alt={label || 'Photo'}
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                type="button"
                onClick={handleDelete}
                disabled={uploading}
                className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-0.5 shadow-sm transition-colors disabled:opacity-50"
                title="Delete photo"
              >
                <X size={12} />
              </button>
            </div>
          ) : (
            <div className="w-16 h-16 border border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
              <Camera size={20} className="text-gray-400" />
            </div>
          )}
          
          {/* Compact Upload Button */}
          <div className="flex-1">
            <button
              type="button"
              onClick={triggerFileInput}
              disabled={uploading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded text-sm transition-colors disabled:opacity-50"
            >
              {uploading ? 'Uploading...' : currentPhotoUrl ? 'Change' : 'Upload'}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInputChange}
              className="hidden"
              disabled={uploading}
            />
          </div>
        </div>
      ) : (
        /* Original full-size layout */
        <>
          {/* Current Photo Display */}
          {currentPhotoUrl && (
            <div className="relative inline-block">
              <div className="w-32 h-32 rounded-lg overflow-hidden border-2 border-gray-200 shadow-md">
                <img
                  src={currentPhotoUrl}
                  alt={label}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Delete Button */}
              <button
                type="button"
                onClick={handleDelete}
                disabled={uploading}
                className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-md transition-colors disabled:opacity-50"
                title="Delete photo"
              >
                <X size={16} />
              </button>
            </div>
          )}

          {/* Upload Area */}
          <div
            className={`
              border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all
              ${dragOver 
                ? 'border-blue-400 bg-blue-50' 
                : 'border-gray-300 hover:border-gray-400'
              }
              ${uploading ? 'opacity-50 cursor-not-allowed' : ''}
            `}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={triggerFileInput}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInputChange}
              className="hidden"
              disabled={uploading}
            />

            {uploading ? (
              <div className="space-y-2">
                <div className="animate-spin mx-auto">
                  <Upload size={32} className="text-blue-500" />
                </div>
                <p className="text-sm text-gray-600">Uploading...</p>
              </div>
            ) : (
              <div className="space-y-2">
                {photoType === 'professional' ? (
                  <User size={32} className="mx-auto text-gray-400" />
                ) : (
                  <Camera size={32} className="mx-auto text-gray-400" />
                )}
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    {currentPhotoUrl ? 'Change Photo' : 'Upload Photo'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Drag and drop or click to select
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    JPEG, PNG, GIF, WebP (max 5MB)
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Manual Upload Button */}
          <button
            type="button"
            onClick={triggerFileInput}
            disabled={uploading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? 'Uploading...' : currentPhotoUrl ? 'Change Photo' : 'Select Photo'}
          </button>
        </>
      )}
    </div>
  );
};

export default PhotoUpload;
