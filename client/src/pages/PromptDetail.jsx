import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { promptAPI, interactionAPI } from '../services/api';
import toast from 'react-hot-toast';

const PromptDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchPromptDetails = async () => {
      try {
        const promptResponse = await promptAPI.getPrompt(id);
        setPrompt(promptResponse.data);

        const commentsResponse = await interactionAPI.getComments(id);
        setComments(commentsResponse.data);
      } catch (error) {
        console.error('Error fetching prompt details:', error);
        toast.error('Failed to load prompt details');
        navigate('/404');
      } finally {
        setLoading(false);
      }
    };
    fetchPromptDetails();
  }, [id, navigate]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!newComment.trim()) {
      toast.error('Comment cannot be empty');
      return;
    }

    setSubmitting(true);
    try {
      const response = await interactionAPI.addComment({
        prompt_id: id,
        text: newComment
      });

      setComments([response.data, ...comments]);
      setNewComment('');
      toast.success('Comment added successfully');
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Failed to add comment');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card mb-8">
        <h1 className="text-2xl font-bold mb-2">{prompt.original}</h1>
        <p className="text-sm text-gray-500 mb-4">
          By {prompt.creator_name || 'Anonymous'} • {new Date(prompt.created_at).toLocaleDateString()}
        </p>
        <div className="space-y-6">
          {/* Original Prompt */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Original Prompt</h3>
            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
              <p>{prompt.original}</p>
            </div>
          </div>
          {/* Enhanced Versions */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Beginner Version</h3>
              <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
                <p className="whitespace-pre-wrap">{prompt.beginner}</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Intermediate Version</h3>
              <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
                <p className="whitespace-pre-wrap">{prompt.intermediate}</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Expert Version</h3>
              <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
                <p className="whitespace-pre-wrap">{prompt.advanced}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Comments</h2>
        
        {/* Comment Form */}
        <form onSubmit={handleCommentSubmit} className="mb-6">
          <textarea
            className="textarea mb-2"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={3}
          />
          <button
            type="submit"
            className="btn btn-primary"
            disabled={submitting}
          >
            {submitting ? 'Posting...' : 'Post Comment'}
          </button>
        </form>
        
        {/* Comments List */}
        <div className="space-y-4">
          {comments.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">
              No comments yet. Be the first to comment!
            </p>
          ) : (
            comments.map(comment => (
              <div key={comment.id} className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4 last:border-0">
                <div className="flex items-center mb-2">
                  <span className="font-semibold mr-2">
                    {comment.username || 'Anonymous'}
                  </span>
                  <p className="text-sm text-gray-500">
                    {new Date(comment.created_at).toLocaleDateString()}
                  </p>
                </div>
                <p className="mt-2">{comment.text}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PromptDetail;
