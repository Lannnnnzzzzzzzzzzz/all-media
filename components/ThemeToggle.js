import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && !theme) {
      setTheme('dark');
    }
  }, [theme, setTheme]);

  if (!mounted) return null;

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => setTheme('light')}
        className={`p-2 rounded-lg ${theme === 'light' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
      >
        ☀️
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
      >
        🌙
      </button>
      <button
        onClick={() => setTheme('system')}
        className={`p-2 rounded-lg ${theme === 'system' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
      >
        🖥️
      </button>
    </div>
  );
}