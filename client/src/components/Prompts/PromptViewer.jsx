import { useState } from 'react';
import { promptAPI } from '../../services/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const PromptViewer = ({ prompt, onSave }) => {
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('beginner');
  const navigate = useNavigate();

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await promptAPI.savePrompt({
        original: prompt.original,
        beginner: prompt.beginner,
        intermediate: prompt.intermediate,
        advanced: prompt.advanced,
        public: true
      });
      
      toast.success('Prompt saved successfully!');
      if (onSave) onSave(response.data);
      navigate(`/prompts/${response.data.id}`);
    } catch (error) {
      console.error('Error saving prompt:', error);
      toast.error('Failed to save prompt');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Original Prompt</h2>
        <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
          <p>{prompt.original}</p>
        </div>
      </div>

      <div className="card">
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'beginner'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('beginner')}
          >
            🟢 Beginner
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'intermediate'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('intermediate')}
          >
            🔵 Intermediate
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'advanced'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('advanced')}
          >
            🔴 Expert
          </button>
        </div>

        <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md whitespace-pre-wrap">
          {activeTab === 'beginner' && prompt.beginner}
          {activeTab === 'intermediate' && prompt.intermediate}
          {activeTab === 'advanced' && prompt.advanced}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          className="btn btn-primary"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
              Saving...
            </div>
          ) : (
            'Save Prompt'
          )}
        </button>
      </div>
    </div>
  );
};

export default PromptViewer;
