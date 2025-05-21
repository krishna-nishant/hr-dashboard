'use client';

import { useEffect, useState } from 'react';
import { User } from '@/types/user';
import { fetchUsers } from '@/services/api';
import UserCard from '@/components/UserCard';
import { useBookmarks } from '@/store/useBookmarks';
import { BookmarkIcon } from '@heroicons/react/24/outline';
import FilterBar from '@/components/FilterBar';
import { useSearch } from '@/hooks/useSearch';

export default function BookmarksPage() {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { bookmarkedIds } = useBookmarks();
  
  const bookmarkedUsers = allUsers.filter(user => bookmarkedIds.includes(user.id));
  
  // Apply search and filters to bookmarked users
  const {
    searchTerm,
    setSearchTerm,
    filters,
    updateDepartmentFilters,
    updateRatingFilters,
    resetFilters,
    filteredUsers
  } = useSearch(bookmarkedUsers);

  // Get all users once
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setAllUsers(data);
      } catch (err) {
        setError('Failed to load bookmarked employees');
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const handleView = (user: User) => {
    alert(`Viewing ${user.firstName}'s profile`);
  };

  const handlePromote = (user: User) => {
    if (user.performanceRating < 4) {
      alert(`${user.firstName}'s performance rating is too low for promotion.`);
    } else {
      alert(`${user.firstName} has been promoted!`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            Your Bookmarks
          </h1>
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            Your Bookmarks
          </h1>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <p className="text-red-500">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show empty state if no bookmarks
  if (bookmarkedUsers.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            Your Bookmarks
          </h1>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center">
            <BookmarkIcon className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-500 mb-3" />
            <h2 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">No bookmarks yet</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              You haven't bookmarked any employees yet. Go to the dashboard and click "Save" on employee cards to bookmark them.
            </p>
            <a 
              href="/"
              className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Go to Dashboard
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          Your Bookmarks
        </h1>
        
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
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600 dark:text-gray-300">
              No bookmarked employees match your filters. Try adjusting your search criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredUsers.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onView={handleView}
                onPromote={handlePromote}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 