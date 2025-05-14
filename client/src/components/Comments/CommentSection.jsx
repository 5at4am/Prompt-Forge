import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { interactionAPI } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';
import CommentItem from './CommentItem';

const CommentSection = ({ promptId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchComments();
  }, [promptId]);

  const fetchComments = async (pageNum = 1) => {
    try {
      setLoading(true);
      const response = await interactionAPI.getComments(promptId, pageNum);
      
      if (pageNum === 1) {
        setComments(response.data);
      } else {
        setComments(prev => [...prev, ...response.data]);
      }
      
      setPage(pageNum);
      setHasMore(response.data.length === 10); // Assuming 10 is the limit
    } catch (error) {
      console.error('Error fetching comments:', error);
      toast.error('Failed to load comments');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated()) {
      toast.error('Please login to add comments');
      navigate('/login');
      return;
    }
    
    if (!newComment.trim()) {
      toast.error('Comment cannot be empty');
      return;
    }
    
    setSubmitting(true);
    try {
      const response = await interactionAPI.addComment({
        promptId,
        text: newComment
      });
      
      // Add the new comment to the top of the list
      setComments(prev => [response.data, ...prev]);
      setNewComment('');
      toast.success('Comment added successfully');
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Failed to add comment');
    } finally {
      setSubmitting(false);
    }
  };

  const loadMore = () => {
    fetchComments(page + 1);
  };

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-6">Comments</h2>
      
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-3">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="textarea"
            rows={3}
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={submitting}
          >
            {submitting ? 'Posting...' : 'Post Comment'}
          </button>
        </div>
      </form>
      
      {loading && comments.length === 0 ? (
        <div className="flex justify-center py-6">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-6 text-gray-500 dark:text-gray-400">
          No comments yet. Be the first to comment!
        </div>
      ) : (
        <div className="space-y-6">
          {comments.map(comment => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
          
          {hasMore && (
            <div className="text-center pt-4">
              <button
                onClick={loadMore}
                className="btn btn-text"
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Load More Comments'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
