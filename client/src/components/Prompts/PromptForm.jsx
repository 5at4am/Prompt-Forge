import { useState } from 'react';
import { promptAPI } from '../../services/api';
import toast from 'react-hot-toast';

const PromptForm = ({ onPromptEnhanced }) => {
  const [originalPrompt, setOriginalPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!originalPrompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }

    setLoading(true);
    try {
      const response = await promptAPI.enhancePrompt(originalPrompt);
      onPromptEnhanced(response.data);
      toast.success('Prompt enhanced successfully!');
    } catch (error) {
      console.error('Error enhancing prompt:', error);
      toast.error('Failed to enhance prompt. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">Enhance Your Prompt</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Enter your prompt idea
          </label>
          <textarea
            id="prompt"
            className="textarea"
            placeholder="Enter a simple idea like 'write about a notebook' or 'create a character description'"
            value={originalPrompt}
            onChange={(e) => setOriginalPrompt(e.target.value)}
            rows={3}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
              Enhancing...
            </div>
          ) : (
            'Enhance Prompt'
          )}
        </button>
      </form>
    </div>
  );
};

export default PromptForm;
