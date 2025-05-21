import { User } from '@/types/user';
import { StarIcon, BookmarkIcon as BookmarkOutline } from '@heroicons/react/24/outline';
import { StarIcon as StarSolid, BookmarkIcon as BookmarkSolid, ArrowUpIcon } from '@heroicons/react/24/solid';
import { useBookmarks } from '@/store/useBookmarks';

interface UserCardProps {
  user: User;
  onView: (user: User) => void;
  onPromote: (user: User) => void;
}

export default function UserCard({ user, onView, onPromote }: UserCardProps) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(user.id);

  const handleBookmarkClick = () => {
    toggleBookmark(user.id);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 hover:shadow-lg transition-all duration-200">
      <div className="flex items-start gap-3">
        {user.image && (
          <img
            src={user.image}
            alt={`${user.firstName}`}
            className="w-14 h-14 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
          />
        )}
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {user.firstName} {user.lastName}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{user.email}</p>
          
          <div className="flex flex-wrap gap-x-4 mt-3 text-sm">
            <span className="inline-block bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-700 dark:text-gray-300">
              {user.age} years
            </span>
            <span className="inline-block bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded text-blue-700 dark:text-blue-300">
              {user.department}
            </span>
          </div>
        </div>
      </div>
      
      <div className="mt-4 border-t border-gray-100 dark:border-gray-700 pt-3">
        <div className="flex items-center mb-3">
          <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">Performance:</span>
          <div className="flex">
            {[...Array(5)].map((_, index) => (
              <StarSolid
                key={index}
                className={`w-4 h-4 ${
                  index < user.performanceRating
                    ? 'text-amber-400'
                    : 'text-gray-200 dark:text-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-2 mt-1">
          <button
            onClick={() => onView(user)}
            className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
          >
            View
          </button>
          <button
            onClick={handleBookmarkClick}
            className={`flex items-center px-3 py-1.5 text-sm rounded transition-colors ${
              bookmarked 
                ? 'bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:hover:bg-amber-900/50' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {bookmarked ? (
              <BookmarkSolid className="w-3.5 h-3.5 mr-1.5" />
            ) : (
              <BookmarkOutline className="w-3.5 h-3.5 mr-1.5" />
            )}
            {bookmarked ? 'Saved' : 'Save'}
          </button>
          <button
            onClick={() => onPromote(user)}
            className="flex items-center ml-auto px-3 py-1.5 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
          >
            <ArrowUpIcon className="w-3.5 h-3.5 mr-1.5" />
            Promote
          </button>
        </div>
      </div>
    </div>
  );
} 