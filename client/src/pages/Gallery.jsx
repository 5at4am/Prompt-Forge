import { useState, useEffect } from 'react';
import { promptAPI } from '../services/api';
import PromptCard from '../components/Prompts/PromptCard';
import toast from 'react-hot-toast';

const Gallery = () => {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [filter, setFilter] = useState('latest');
  const [category, setCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'writing', name: 'Writing' },
    { id: 'coding', name: 'Coding' },
    { id: 'business', name: 'Business' },
    { id: 'creative', name: 'Creative' },
    { id: 'academic', name: 'Academic' },
  ];

  useEffect(() => {
    fetchPrompts(1);
  }, [filter, category]);

  const fetchPrompts = async (pageNum = 1) => {
    try {
      setLoading(true);
      
      // Build query parameters
      const params = new URLSearchParams();
      params.append('page', pageNum);
      params.append('limit', 12);
      params.append('sort', filter);
      
      if (category !== 'all') {
        params.append('category', category);
      }
      
      const response = await promptAPI.getPublicPrompts(pageNum, 12, filter, category !== 'all' ? category : null);
      
      if (pageNum === 1) {
        setPrompts(response.data);
      } else {
        setPrompts(prev => [...prev, ...response.data]);
      }
      
      setPage(pageNum);
      setHasMore(response.data.length === 12); // Assuming 12 is the limit
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
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Prompt Gallery</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Explore and discover prompts created by the community
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mb-8">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Sort By
          </label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="select w-full"
          >
            <option value="latest">Latest</option>
            <option value="popular">Most Popular</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
        
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="select w-full"
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
      </div>

      {loading && prompts.length === 0 ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      ) : prompts.length === 0 ? (
        <div className="card text-center py-12">
          <h2 className="text-xl font-semibold mb-4">No prompts found</h2>
          <p className="text-gray-600 dark:text-gray-300">
            No prompts match your current filters. Try changing your search criteria.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prompts.map(prompt => (
              <PromptCard key={prompt.id} prompt={prompt} />
            ))}
          </div>
          
          {hasMore && (
            <div className="text-center pt-8">
              <button
                onClick={loadMore}
                className="btn btn-secondary"
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Gallery;
