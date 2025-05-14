const InteractionModel = require('../models/interactionModel');
const PromptModel = require('../models/promptModel');

/**
 * Controller for interaction-related operations (comments, likes)
 */
class InteractionController {
  /**
   * Add a comment to a prompt
   */
  async addComment(req, res) {
    try {
      const { prompt_id, text } = req.body;

      if (!prompt_id || !text || text.trim() === '') {
        return res.status(400).json({ error: 'Prompt ID and comment text are required' });
      }

      // Check if prompt exists
      const prompt = await PromptModel.getById(prompt_id);
      if (!prompt) {
        return res.status(404).json({ error: 'Prompt not found' });
      }

      // Use either user ID from authenticated user or session ID for anonymous
      const user_id = req.user ? req.user.id : req.sessionID;

      const comment = await InteractionModel.addComment({
        prompt_id,
        user_id,
        text
      });

      return res.status(201).json(comment);
    } catch (error) {
      console.error('Error adding comment:', error);
      return res.status(500).json({ error: 'Failed to add comment' });
    }
  }

  /**
   * Get comments for a prompt
   */
  async getComments(req, res) {
    try {
      const { prompt_id } = req.params;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      // Check if prompt exists
      const prompt = await PromptModel.getById(prompt_id);
      if (!prompt) {
        return res.status(404).json({ error: 'Prompt not found' });
      }

      const comments = await InteractionModel.getCommentsByPromptId(prompt_id, page, limit);

      return res.status(200).json(comments);
    } catch (error) {
      console.error('Error getting comments:', error);
      return res.status(500).json({ error: 'Failed to get comments' });
    }
  }

  /**
   * Like a prompt
   */
  async likePrompt(req, res) {
    try {
      const { prompt_id } = req.params;

      // Check if prompt exists
      const prompt = await PromptModel.getById(prompt_id);
      if (!prompt) {
        return res.status(404).json({ error: 'Prompt not found' });
      }

      // Use either user ID or session ID
      const user_id = req.user ? req.user.id : req.sessionID;

      const result = await InteractionModel.likePrompt({
        prompt_id,
        user_id
      });

      if (!result.success) {
        return res.status(400).json({ error: result.message });
      }

      return res.status(200).json({ message: 'Prompt liked successfully' });
    } catch (error) {
      console.error('Error liking prompt:', error);
      return res.status(500).json({ error: 'Failed to like prompt' });
    }
  }

  /**
   * Unlike a prompt
   */
  async unlikePrompt(req, res) {
    try {
      const { prompt_id } = req.params;

      // Check if prompt exists
      const prompt = await PromptModel.getById(prompt_id);
      if (!prompt) {
        return res.status(404).json({ error: 'Prompt not found' });
      }

      // Use either user ID or session ID
      const user_id = req.user ? req.user.id : req.sessionID;

      const result = await InteractionModel.unlikePrompt(prompt_id, user_id);

      if (!result.success) {
        return res.status(400).json({ error: 'You have not liked this prompt' });
      }

      return res.status(200).json({ message: 'Prompt unliked successfully' });
    } catch (error) {
      console.error('Error unliking prompt:', error);
      return res.status(500).json({ error: 'Failed to unlike prompt' });
    }
  }

  /**
   * Check if a user has liked a prompt
   */
  async checkLike(req, res) {
    try {
      const { prompt_id } = req.params;

      // Use either user ID or session ID
      const user_id = req.user ? req.user.id : req.sessionID;

      const hasLiked = await InteractionModel.hasUserLiked(prompt_id, user_id);

      return res.status(200).json({ hasLiked });
    } catch (error) {
      console.error('Error checking like:', error);
      return res.status(500).json({ error: 'Failed to check like status' });
    }
  }

  /**
   * Count likes for a prompt
   */
  async getLikeCount(req, res) {
    try {
      const { prompt_id } = req.params;

      // Check if prompt exists
      const prompt = await PromptModel.getById(prompt_id);
      if (!prompt) {
        return res.status(404).json({ error: 'Prompt not found' });
      }

      const count = await InteractionModel.countLikes(prompt_id);

      return res.status(200).json({ count });
    } catch (error) {
      console.error('Error counting likes:', error);
      return res.status(500).json({ error: 'Failed to count likes' });
    }
  }
}

module.exports = new InteractionController();
