import { useState } from 'react';
import PromptForm from '../components/Prompts/PromptForm';
import PromptViewer from '../components/Prompts/PromptViewer';

const Home = () => {
  const [enhancedPrompt, setEnhancedPrompt] = useState(null);

  const handlePromptEnhanced = (prompt) => {
    setEnhancedPrompt(prompt);
    window.scrollTo({
      top: document.getElementById('enhanced-prompt')?.offsetTop - 100,
      behavior: 'smooth'
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Transform Your Prompts with AI
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Enter a simple idea and get professionally enhanced versions for different skill levels
        </p>
      </div>

      <div className="mb-12">
        <PromptForm onPromptEnhanced={handlePromptEnhanced} />
      </div>

      {enhancedPrompt && (
        <div id="enhanced-prompt">
          <PromptViewer prompt={enhancedPrompt} />
        </div>
      )}

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="card text-center">
          <div className="text-3xl mb-4">🚀</div>
          <h3 className="text-lg font-semibold mb-2">Enhance</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Transform simple ideas into structured, effective prompts
          </p>
        </div>
        <div className="card text-center">
          <div className="text-3xl mb-4">💾</div>
          <h3 className="text-lg font-semibold mb-2">Save</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Store your enhanced prompts for future use
          </p>
        </div>
        <div className="card text-center">
          <div className="text-3xl mb-4">👥</div>
          <h3 className="text-lg font-semibold mb-2">Share</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Collaborate with others to improve your prompts
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
