"use client"

import { useEffect, useState } from "react"
import type { User } from "@/types/user"
import { fetchUsers } from "@/services/api"
import BookmarkCard from "@/components/BookmarkCard"
import { useBookmarks } from "@/store/useBookmarks"
import { BookmarkIcon } from "@heroicons/react/24/outline"
import FilterBar from "@/components/FilterBar"
import { useSearch } from "@/hooks/useSearch"

export default function BookmarksPage() {
  const [allUsers, setAllUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { bookmarkedIds } = useBookmarks()

  const bookmarkedUsers = allUsers.filter((user) => bookmarkedIds.includes(user.id))

  // Apply search and filters to bookmarked users
  const {
    searchTerm,
    setSearchTerm,
    filters,
    updateDepartmentFilters,
    updateRatingFilters,
    resetFilters,
    filteredUsers,
  } = useSearch(bookmarkedUsers)

  // Get all users once
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers()
        setAllUsers(data)
      } catch (err) {
        setError("Failed to load bookmarked employees")
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, [])

  // Force component update when bookmarkedIds changes (due to removal)
  useEffect(() => {
    // This effect will run whenever bookmarkedIds changes
  }, [bookmarkedIds])

  const handleView = (user: User) => {
    // alert(`Viewing ${user.firstName}'s profile`)
  }

  const handlePromote = (user: User) => {
    if (user.performanceRating < 4) {
      alert(`${user.firstName}'s performance rating is too low for promotion.`)
    } else {
      alert(`${user.firstName} has been promoted!`)
    }
  }

  const handleAssignToProject = (user: User) => {
    alert(`${user.firstName} ${user.lastName} has been assigned to a new project!`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-amber-400 to-amber-600 dark:from-amber-500 dark:to-amber-700 p-6 rounded-xl shadow-sm mb-8">
            <div className="flex items-center">
              <BookmarkIcon className="h-8 w-8 text-white mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-white mb-1">Your Bookmarked Employees</h1>
                <p className="text-amber-100">Manage your saved employees and assign them to projects</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-amber-400 to-amber-600 dark:from-amber-500 dark:to-amber-700 p-6 rounded-xl shadow-sm mb-8">
            <div className="flex items-center">
              <BookmarkIcon className="h-8 w-8 text-white mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-white mb-1">Your Bookmarked Employees</h1>
                <p className="text-amber-100">Manage your saved employees and assign them to projects</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Show empty state if no bookmarks
  if (bookmarkedUsers.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-amber-400 to-amber-600 dark:from-amber-500 dark:to-amber-700 p-6 rounded-xl shadow-sm mb-8">
            <div className="flex items-center">
              <BookmarkIcon className="h-8 w-8 text-white mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-white mb-1">Your Bookmarked Employees</h1>
                <p className="text-amber-100">Manage your saved employees and assign them to projects</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-10 rounded-xl shadow-sm text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-100 dark:bg-amber-900/30 rounded-full mb-6">
              <BookmarkIcon className="w-10 h-10 text-amber-500" />
            </div>
            <h2 className="text-2xl font-medium text-gray-800 dark:text-gray-200 mb-3">No bookmarks yet</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
              You haven't bookmarked any employees yet. Go to the dashboard and click "Save" on employee cards to
              bookmark them.
            </p>
            <a
              href="/"
              className="inline-flex items-center px-5 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-200 shadow-sm"
            >
              Go to Dashboard
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-amber-400 to-amber-600 dark:from-amber-500 dark:to-amber-700 p-6 rounded-xl shadow-sm mb-8">
          <div className="flex items-center">
            <BookmarkIcon className="h-8 w-8 text-white mr-3" />
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">Your Bookmarked Employees</h1>
              <p className="text-amber-100">Manage your saved employees and assign them to projects</p>
            </div>
          </div>
        </div>

        <FilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedDepartments={filters.departments}
          onDepartmentChange={updateDepartmentFilters}
          selectedRatings={filters.ratings}
          onRatingChange={updateRatingFilters}
          onReset={resetFilters}
          totalCount={bookmarkedUsers.length}
          filteredCount={filteredUsers.length}
        />

        {filteredUsers.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 text-center">
            <p className="text-gray-600 dark:text-gray-300">
              No bookmarked employees match your filters. Try adjusting your search criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <BookmarkCard
                key={user.id}
                user={user}
                onView={handleView}
                onPromote={handlePromote}
                onAssignToProject={handleAssignToProject}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
