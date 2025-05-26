"use client"

import type { User } from "@/types/user"
import { BookmarkIcon as BookmarkOutline } from "@heroicons/react/24/outline"
import { StarIcon as StarSolid, BookmarkIcon as BookmarkSolid, ArrowUpIcon } from "@heroicons/react/24/solid"
import { useBookmarks } from "@/store/useBookmarks"
import Link from "next/link"
import Image from 'next/image'

interface UserCardProps {
  user: User
  onView: (user: User) => void
  onPromote: (user: User) => void
}

export default function UserCard({ user, onView, onPromote }: UserCardProps) {
  const { isBookmarked, toggleBookmark } = useBookmarks()
  const bookmarked = isBookmarked(user.id)

  const handleBookmarkClick = () => {
    toggleBookmark(user.id)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 hover:shadow-md transition-all duration-300">
      <div className="flex items-start gap-4">
        {user.image && (
          <Image
            src={user.image || "/placeholder.svg"}
            alt={`${user.firstName} ${user.lastName}'s avatar`}
            width={64}
            height={64}
            className="rounded-full"
          />
        )}
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {user.firstName} {user.lastName}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{user.email}</p>

          <div className="flex flex-wrap gap-2 mt-3">
            <span className="inline-block bg-gray-100 dark:bg-gray-700 px-2.5 py-1 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300">
              {user.age} years
            </span>
            <span className="inline-block bg-indigo-100 dark:bg-indigo-900/30 px-2.5 py-1 rounded-full text-xs font-medium text-indigo-700 dark:text-indigo-300">
              {user.department}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 border-t border-gray-100 dark:border-gray-700 pt-4">
        <div className="flex items-center mb-3">
          <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">Performance:</span>
          <div className="flex">
            {[...Array(5)].map((_, index) => (
              <StarSolid
                key={index}
                className={`w-4 h-4 ${
                  index < user.performanceRating ? "text-amber-400" : "text-gray-200 dark:text-gray-600"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-2 mt-2">
          <Link
            href={`/hr-dashboard/employee/${user.id}`}
            className="px-3.5 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors"
            onClick={(e) => {
              e.preventDefault()
              onView(user)
              window.location.href = `/hr-dashboard/employee/${user.id}`
            }}
          >
            View
          </Link>
          <button
            onClick={handleBookmarkClick}
            className={`flex items-center px-3.5 py-2 text-sm rounded-lg transition-colors ${
              bookmarked
                ? "bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:hover:bg-amber-900/50"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            {bookmarked ? (
              <BookmarkSolid className="w-3.5 h-3.5 mr-1.5" />
            ) : (
              <BookmarkOutline className="w-3.5 h-3.5 mr-1.5" />
            )}
            {bookmarked ? "Saved" : "Save"}
          </button>
          <button
            onClick={() => onPromote(user)}
            className="flex items-center ml-auto px-3.5 py-2 bg-emerald-600 text-white text-sm rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <ArrowUpIcon className="w-3.5 h-3.5 mr-1.5" />
            Promote
          </button>
        </div>
      </div>
    </div>
  )
}
