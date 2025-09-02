import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '../components/ThemeToggle';
import DownloadCard from '../components/DownloadCard';
import VideoPreview from '../components/VideoPreview';

const platforms = [
  { name: 'YouTube', value: 'youtube' },
  { name: 'TikTok', value: 'tiktok' },
  { name: 'Facebook', value: 'facebook' },
  { name: 'Spotify', value: 'spotify' },
  { name: 'Dailymotion', value: 'dailymotion' },
  { name: 'Instagram', value: 'instagram' },
];

export default function Home() {
  const [url, setUrl] = useState('');
  const [platform, setPlatform] = useState('youtube');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleDownload = async () => {
    if (!url) {
      setError('URL is required');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(`/api/${platform}?url=${encodeURIComponent(url)}`);
      const data = await response.json();

      if (response.ok) {
        setResult(data);
        
        // Set preview URL if available
        if (data.videoQualities && Object.keys(data.videoQualities).length > 0) {
          const firstQuality = Object.keys(data.videoQualities)[0];
          setPreviewUrl(data.videoQualities[firstQuality].url);
        }
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-dark-100 rounded-xl shadow-lg p-6 mb-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
              Multi-Platform Downloader
            </h1>
            <ThemeToggle />
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Platform
              </label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-200 dark:text-gray-100"
              >
                {platforms.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Video/Audio URL
              </label>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste URL here..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-200 dark:text-gray-100"
              />
            </div>

            <button
              onClick={handleDownload}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Loading...' : 'Download'}
            </button>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-lg"
            >
              {error}
            </motion.div>
          )}
        </motion.div>

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <DownloadCard result={result} />
              {previewUrl && result.thumbnail && (
                <VideoPreview url={previewUrl} thumbnail={result.thumbnail} />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}