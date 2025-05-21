'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon, BookmarkIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolid, ChartBarIcon as ChartBarSolid } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useBookmarks } from '@/store/useBookmarks';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { bookmarkedIds } = useBookmarks();
  const pathname = usePathname();
  const isBookmarksPage = pathname === '/bookmarks';
  const isAnalyticsPage = pathname === '/analytics';
  
  // Use state to prevent hydration mismatch
  const [mounted, setMounted] = useState(false);
  
  // After mounting, we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Determine which icon to show based on the current theme
  const showSunIcon = mounted && (resolvedTheme === 'dark');

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-gray-900 dark:text-white mr-8">HR Dashboard</span>
            </Link>
            
            <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
              <Link 
                href="/"
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  !isBookmarksPage && !isAnalyticsPage
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Dashboard
              </Link>
              
              <Link 
                href="/bookmarks"
                className={`px-3 py-2 text-sm font-medium rounded-md flex items-center ${
                  isBookmarksPage
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {isBookmarksPage ? (
                  <BookmarkSolid className="h-4 w-4 mr-1.5 text-amber-500" />
                ) : (
                  <BookmarkIcon className="h-4 w-4 mr-1.5" />
                )}
                Bookmarks
                {bookmarkedIds.length > 0 && (
                  <span className="ml-1.5 px-2 py-0.5 text-xs rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
                    {bookmarkedIds.length}
                  </span>
                )}
              </Link>
              
              <Link 
                href="/analytics"
                className={`px-3 py-2 text-sm font-medium rounded-md flex items-center ${
                  isAnalyticsPage
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {isAnalyticsPage ? (
                  <ChartBarSolid className="h-4 w-4 mr-1.5 text-blue-500" />
                ) : (
                  <ChartBarIcon className="h-4 w-4 mr-1.5" />
                )}
                Analytics
              </Link>
            </div>
          </div>
          
          <div className="flex items-center">
            <button
              onClick={() => setTheme(showSunIcon ? 'light' : 'dark')}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
              aria-label="Toggle theme"
            >
              {mounted && (
                showSunIcon ? (
                  <SunIcon className="h-5 w-5 text-gray-600 dark:text-gray-200" />
                ) : (
                  <MoonIcon className="h-5 w-5 text-gray-600 dark:text-gray-200" />
                )
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
} 