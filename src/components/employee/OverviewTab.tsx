import type { User } from "@/types/user"
import { PhoneIcon, EnvelopeIcon, MapPinIcon, StarIcon, UserIcon } from "@heroicons/react/24/outline"
import { StarIcon as StarSolid } from "@heroicons/react/24/solid"

interface OverviewTabProps {
  employee: User
  details: {
    address: string
    phone: string
    bio: string
    performanceHistory: {
      month: string
      rating: number
      comment: string
    }[]
  }
}

export default function OverviewTab({ employee, details }: OverviewTabProps) {
  if (!details) {
    return <div>Loading details...</div>
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
          <span className="bg-indigo-100 dark:bg-indigo-900/30 p-1.5 rounded-md mr-2">
            <UserIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          </span>
          Basic Information
        </h3>
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex items-start">
              <EnvelopeIcon className="w-5 h-5 text-gray-500 mt-0.5 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</p>
                <p className="text-gray-800 dark:text-gray-200">{employee.email}</p>
              </div>
            </div>
            <div className="flex items-start">
              <PhoneIcon className="w-5 h-5 text-gray-500 mt-0.5 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</p>
                <p className="text-gray-800 dark:text-gray-200">{details.phone}</p>
              </div>
            </div>
            <div className="flex items-start">
              <MapPinIcon className="w-5 h-5 text-gray-500 mt-0.5 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Address</p>
                <p className="text-gray-800 dark:text-gray-200">{details.address}</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-5 h-5 flex justify-center text-gray-500 mt-0.5 mr-3">
                <span className="font-bold">★</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Performance Rating</p>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <StarSolid
                      key={i}
                      className={`w-4 h-4 ${
                        i < employee.performanceRating ? "text-amber-400" : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-gray-800 dark:text-gray-200">{employee.performanceRating}/5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
          <span className="bg-purple-100 dark:bg-purple-900/30 p-1.5 rounded-md mr-2">
            <UserIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </span>
          About
        </h3>
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-5">
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{details.bio}</p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
          <span className="bg-amber-100 dark:bg-amber-900/30 p-1.5 rounded-md mr-2">
            <StarIcon className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </span>
          Performance History
        </h3>
        <div className="space-y-4">
          {details.performanceHistory.map((review, index) => (
            <div
              key={index}
              className="border border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:shadow-sm transition-all duration-200"
            >
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-medium text-gray-900 dark:text-white">{review.month}</h4>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating ? "text-amber-400 fill-current" : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}