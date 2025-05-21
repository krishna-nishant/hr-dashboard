import { useState } from 'react';
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';

interface Feedback {
  id: number;
  from: string;
  date: string;
  rating: number;
  message: string;
  type: 'peer' | 'manager' | 'self';
}

interface FeedbackTabProps {
  feedback: Feedback[];
}

export default function FeedbackTab({ feedback }: FeedbackTabProps) {
  const [newFeedback, setNewFeedback] = useState({
    rating: 0,
    message: '',
    type: 'peer'
  });
  const [hoveredRating, setHoveredRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleRatingClick = (rating: number) => {
    setNewFeedback(prev => ({ ...prev, rating }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In a real app, we would save the feedback here
    setTimeout(() => {
      setNewFeedback({
        rating: 0,
        message: '',
        type: 'peer'
      });
      setSubmitted(false);
    }, 3000);
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'peer': return 'Peer Review';
      case 'manager': return 'Manager Review';
      case 'self': return 'Self Assessment';
      default: return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'peer': 
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'manager': 
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'self': 
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      default: 
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-8">
      {/* Feedback List */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Feedback History
        </h3>

        {(!feedback || feedback.length === 0) ? (
          <div className="text-center py-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400">No feedback available yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {feedback.map(item => (
              <div 
                key={item.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
              >
                <div className="flex justify-between mb-2">
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {item.from}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                      {item.date}
                    </span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(item.type)}`}>
                    {getTypeLabel(item.type)}
                  </span>
                </div>
                
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    i < item.rating ? (
                      <StarSolid key={i} className="w-5 h-5 text-yellow-400" />
                    ) : (
                      <StarOutline key={i} className="w-5 h-5 text-gray-300 dark:text-gray-600" />
                    )
                  ))}
                </div>
                
                <p className="text-gray-700 dark:text-gray-300">{item.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Feedback Form */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Add Feedback
        </h3>
        
        {submitted ? (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/30 rounded-lg p-4">
            <p className="text-green-700 dark:text-green-300">
              Thank you! Your feedback has been submitted successfully.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Feedback Type
              </label>
              <select
                value={newFeedback.type}
                onChange={(e) => setNewFeedback(prev => ({ ...prev, type: e.target.value as any }))}
                className="w-full rounded-md border border-gray-300 dark:border-gray-700 py-2 px-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="peer">Peer Review</option>
                <option value="manager">Manager Review</option>
                <option value="self">Self Assessment</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Rating
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => handleRatingClick(rating)}
                    onMouseEnter={() => setHoveredRating(rating)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="p-1 focus:outline-none"
                  >
                    {rating <= (hoveredRating || newFeedback.rating) ? (
                      <StarSolid className="w-8 h-8 text-yellow-400" />
                    ) : (
                      <StarOutline className="w-8 h-8 text-gray-300 dark:text-gray-600" />
                    )}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Feedback Message
              </label>
              <textarea
                value={newFeedback.message}
                onChange={(e) => setNewFeedback(prev => ({ ...prev, message: e.target.value }))}
                rows={4}
                className="w-full rounded-md border border-gray-300 dark:border-gray-700 py-2 px-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="Share your feedback about this employee..."
              ></textarea>
            </div>
            
            <div>
              <button
                type="submit"
                disabled={newFeedback.rating === 0 || newFeedback.message.trim() === ''}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Feedback
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
} 