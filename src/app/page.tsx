"use client"

import { useEffect, useState } from "react"
import type { User } from "@/types/user"
import { fetchUsers } from "@/services/api"
import UserCard from "@/components/UserCard"
import FilterBar from "@/components/FilterBar"
import { useSearch } from "@/hooks/useSearch"
import { UserGroupIcon } from "@heroicons/react/24/outline"

export default function DashboardPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const {
    searchTerm,
    setSearchTerm,
    filters,
    updateDepartmentFilters,
    updateRatingFilters,
    resetFilters,
    filteredUsers,
  } = useSearch(users)

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      const data = await fetchUsers()
      setUsers(data)
    } catch (err) {
      setError("Something went wrong. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  const handleView = (user: User) => {
    // Would navigate to user profile in a real app
  }

  const handlePromote = (user: User) => {
    // Simple promotion feedback
    if (user.performanceRating < 4) {
      alert(`${user.firstName}'s performance rating is too low for promotion.`)
    } else {
      alert(`${user.firstName} has been promoted!`)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-8">
            <div className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm mr-4">
              <UserGroupIcon className="h-6 w-6 text-indigo-500" />
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-500">
              Team Performance Dashboard
            </h1>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-8">
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 h-48 animate-pulse">
                <div className="flex gap-3">
                  <div className="w-14 h-14 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                  <div className="flex-1">
                    <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-full w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm mr-4">
              <UserGroupIcon className="h-6 w-6 text-indigo-500" />
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-500">
              Team Performance Dashboard
            </h1>
          </div>

          <div className="p-10 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <h2 className="text-xl text-red-600 mb-4">Oops! Something went wrong</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">{error}</p>
            <button
              onClick={loadUsers}
              className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <div className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm mr-4">
            <UserGroupIcon className="h-6 w-6 text-indigo-500" />
          </div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-500">
            Team Performance Dashboard
          </h1>
        </div>

        <FilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedDepartments={filters.departments}
          onDepartmentChange={updateDepartmentFilters}
          selectedRatings={filters.ratings}
          onRatingChange={updateRatingFilters}
          onReset={resetFilters}
          totalCount={users.length}
          filteredCount={filteredUsers.length}
        />

        {filteredUsers.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 text-center">
            <p className="text-gray-600 dark:text-gray-300">
              No employees found matching your filters. Try adjusting your search criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <UserCard key={user.id} user={user} onView={handleView} onPromote={handlePromote} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
