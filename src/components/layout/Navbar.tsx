"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { SunIcon, MoonIcon, BookmarkIcon, ChartBarIcon, HomeIcon } from "@heroicons/react/24/outline"
import {
  BookmarkIcon as BookmarkSolid,
  ChartBarIcon as ChartBarSolid,
  HomeIcon as HomeSolid,
} from "@heroicons/react/24/solid"
import Link from "next/link"
import { useBookmarks } from "@/store/useBookmarks"
import { usePathname } from "next/navigation"

export function Navbar() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const { bookmarkedIds } = useBookmarks()
  const pathname = usePathname()
  const isDashboard = pathname === "/"
  const isBookmarksPage = pathname === "/bookmarks"
  const isAnalyticsPage = pathname === "/analytics"

  // Use state to prevent hydration mismatch
  const [mounted, setMounted] = useState(false)

  // After mounting, we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  // Determine which icon to show based on the current theme
  const showSunIcon = mounted && resolvedTheme === "dark"

  return (
    <nav className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent text-xl font-bold mr-8">
                HR Dashboard
              </span>
            </Link>

            <div className="hidden sm:ml-6 sm:flex sm:space-x-2">
              <Link
                href="/"
                className={`px-3 py-2 text-sm font-medium rounded-lg flex items-center transition-all duration-200 ${
                  isDashboard
                    ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/30"
                }`}
              >
                {isDashboard ? (
                  <HomeSolid className="h-4 w-4 mr-1.5 text-indigo-500" />
                ) : (
                  <HomeIcon className="h-4 w-4 mr-1.5" />
                )}
                Dashboard
              </Link>

              <Link
                href="/bookmarks"
                className={`px-3 py-2 text-sm font-medium rounded-lg flex items-center transition-all duration-200 ${
                  isBookmarksPage
                    ? "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/30"
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
                className={`px-3 py-2 text-sm font-medium rounded-lg flex items-center transition-all duration-200 ${
                  isAnalyticsPage
                    ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/30"
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
            {/* <button
              onClick={() => setTheme(showSunIcon ? "light" : "dark")}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle theme"
            >
              {mounted &&
                (showSunIcon ? (
                  <SunIcon className="h-5 w-5 text-amber-500" />
                ) : (
                  <MoonIcon className="h-5 w-5 text-indigo-500" />
                ))}
            </button> */}
          </div>
        </div>
      </div>
    </nav>
  )
}
