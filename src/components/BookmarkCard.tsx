import { User } from '@/types/user';
import { StarIcon as StarSolid, DocumentTextIcon } from '@heroicons/react/24/solid';
import { useBookmarks } from '@/store/useBookmarks';
import Link from 'next/link';

interface BookmarkCardProps {
  user: User;
  onView: (user: User) => void;
  onPromote: (user: User) => void;
  onAssignToProject: (user: User) => void;
}

export default function BookmarkCard({ user, onView, onPromote, onAssignToProject }: BookmarkCardProps) {
  const { removeBookmark } = useBookmarks();

  const handleRemoveBookmark = () => {
    removeBookmark(user.id);
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

        <div className="flex flex-wrap gap-2 mt-1">
          <Link 
            href={`/employee/${user.id}`}
            className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              onView(user);
              window.location.href = `/employee/${user.id}`;
            }}
          >
            View
          </Link>
          <button
            onClick={handleRemoveBookmark}
            className="flex items-center px-3 py-1.5 bg-red-100 text-red-700 text-sm rounded hover:bg-red-200 transition-colors dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50"
          >
            Remove
          </button>
          <button
            onClick={() => onPromote(user)}
            className="flex items-center px-3 py-1.5 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
          >
            Promote
          </button>
          <button
            onClick={() => onAssignToProject(user)}
            className="flex items-center px-3 py-1.5 bg-purple-600 text-white text-sm rounded hover:bg-purple-700 transition-colors"
          >
            <DocumentTextIcon className="w-3.5 h-3.5 mr-1.5" />
            Assign Project
          </button>
        </div>
      </div>
    </div>
  );
} 