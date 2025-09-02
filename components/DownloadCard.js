import { motion } from 'framer-motion';

export default function DownloadCard({ result }) {
  // Helper function to format bytes
  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-dark-100 rounded-xl shadow-lg p-6"
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Download Result
      </h2>
      
      {result.thumbnail && (
        <div className="mb-4">
          <img
            src={result.thumbnail}
            alt={result.title}
            className="w-full h-auto rounded-lg"
          />
        </div>
      )}
      
      <h3 className="text-lg font-medium mb-2 text-gray-800 dark:text-gray-100">
        {result.title}
      </h3>
      {result.author && (
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          By: {result.author}
        </p>
      )}
      
      <div className="space-y-4">
        {Object.keys(result.videoQualities).length > 0 && (
          <div>
            <h4 className="font-medium text-gray-800 dark:text-gray-100 mb-2">
              Video Quality
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {Object.entries(result.videoQualities).map(([quality, info]) => (
                <div key={quality} className="flex items-center justify-between bg-gray-50 dark:bg-dark-200 p-3 rounded-lg">
                  <div className="flex-1">
                    <span className="font-medium text-gray-800 dark:text-gray-100">
                      {quality} {info.container && `(${info.container})`}
                    </span>
                    {info.size && (
                      <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                        {formatBytes(info.size)}
                      </span>
                    )}
                  </div>
                  <a
                    href={info.url}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 hover:bg-green-700 text-white font-medium py-1 px-3 rounded-lg text-center transition duration-300"
                  >
                    Download
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {Object.keys(result.audioQualities).length > 0 && (
          <div>
            <h4 className="font-medium text-gray-800 dark:text-gray-100 mb-2">
              Audio Quality
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {Object.entries(result.audioQualities).map(([quality, info]) => (
                <div key={quality} className="flex items-center justify-between bg-gray-50 dark:bg-dark-200 p-3 rounded-lg">
                  <div className="flex-1">
                    <span className="font-medium text-gray-800 dark:text-gray-100">
                      {quality} {info.container && `(${info.container})`}
                    </span>
                    {info.size && (
                      <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                        {formatBytes(info.size)}
                      </span>
                    )}
                  </div>
                  <a
                    href={info.url}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-1 px-3 rounded-lg text-center transition duration-300"
                  >
                    Download
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}