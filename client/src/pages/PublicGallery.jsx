import { useState, useEffect } from 'react';
import { promptAPI } from '../services/api';
import PromptCard from '../components/Prompts/PromptCard';
import toast from 'react-hot-toast';

const PublicGallery = () => {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchPrompts();
  }, []);

  const fetchPrompts = async (pageNum = 1) => {
    try {
      setLoading(true);
      const response = await promptAPI.getPublicPrompts(pageNum);
      
      if (pageNum === 1) {
        setPrompts(response.data);
      } else {
        setPrompts(prev => [...prev, ...response.data]);
      }
      
      setPage(pageNum);
      setHasMore(response.data.length === 10); // Assuming 10 is the limit
    } catch (error) {
      console.error('Error fetching prompts:', error);
      toast.error('Failed to load prompts');
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    fetchPrompts(page + 1);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Public Prompt Gallery</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Explore prompts created by the community
        </p>
      </div>

      {loading && prompts.length === 0 ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      ) : prompts.length === 0 ? (
        <div className="card text-center py-12">
          <h2 className="text-xl font-semibold mb-4">No prompts available</h2>
          <p className="text-gray-600 dark:text-gray-300">
            There are no public prompts available yet. Be the first to share one!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {prompts.map(prompt => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
          
          {hasMore && (
            <div className="text-center pt-4">
              <button
                onClick={loadMore}
                className="btn btn-secondary"
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PublicGallery;
