import { useState } from 'react';

export default function VideoPreview({ url, thumbnail }) {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="mt-4">
      {showPreview ? (
        <div className="relative">
          <video 
            src={url} 
            controls 
            className="w-full h-auto rounded-lg"
          />
          <button
            onClick={() => setShowPreview(false)}
            className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1"
          >
            ✕
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={thumbnail}
            alt="Video preview"
            className="w-full h-auto rounded-lg cursor-pointer"
            onClick={() => setShowPreview(true)}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={() => setShowPreview(true)}
              className="bg-white bg-opacity-80 rounded-full p-3"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}