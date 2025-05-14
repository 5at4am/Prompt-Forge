import { useState } from 'react';
import { Link } from 'react-router-dom';

const PromptCard = ({ prompt, showActions = true }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">
          {prompt.creator_name ? prompt.creator_name[0].toUpperCase() : 'A'}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold">
            <Link to={`/prompts/${prompt.id}`} className="hover:text-primary-600 transition-colors">
              {prompt.original.length > 60 
                ? prompt.original.substring(0, 60) + '...' 
                : prompt.original}
            </Link>
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {prompt.creator_name ? `By ${prompt.creator_name}` : 'Anonymous'} • {formatDate(prompt.created_at)}
          </p>
        </div>
      </div>
      <div className="mb-4">
        <p className="text-gray-600 dark:text-gray-300">
          {prompt.beginner?.substring(0, 120)}...
        </p>
      </div>
      {showActions && (
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>{prompt.like_count || 0}</span>
            </div>
            <Link 
              to={`/prompts/${prompt.id}`} 
              className="flex items-center space-x-1 text-gray-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <span>{prompt.comment_count || 0}</span>
            </Link>
          </div>
          <Link 
            to={`/prompts/${prompt.id}`}
            className="text-sm text-primary-600 hover:underline"
          >
            View Details →
          </Link>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
