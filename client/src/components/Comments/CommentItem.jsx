import { Link } from 'react-router-dom';

const CommentItem = ({ comment }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-300 mr-2">
            {comment.user?.username?.charAt(0).toUpperCase() || 'A'}
          </div>
          <div>
            <div className="font-medium">
              {comment.user?.username || 'Anonymous'}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {formatDate(comment.created_at)}
            </div>
          </div>
        </div>
      </div>
      <div className="pl-10">
        <p className="text-gray-700 dark:text-gray-300">{comment.text}</p>
      </div>
    </div>
  );
};

export default CommentItem;
