const PromptModel = require("../models/promptModel");
const aiService = require("../services/aiService");

/**
 * Controller for prompt-related operations
 */
class PromptController {
  /**
   * Enhance a prompt using AI
   */
  async enhancePrompt(req, res) {
    try {
      const { original } = req.body;

      if (!original || original.trim() === "") {
        return res.status(400).json({ error: "Prompt cannot be empty" });
      }

      const enhancedPrompts = await aiService.enhancePrompt(original);

      return res.status(200).json(enhancedPrompts);
    } catch (error) {
      console.error("Error enhancing prompt:", error);
      return res.status(500).json({ error: "Failed to enhance prompt" });
    }
  }

  /**
   * Save an enhanced prompt
   */
  async savePrompt(req, res) {
    try {
      const {
        original,
        beginner,
        intermediate,
        advanced,
        isPublic = true,
      } = req.body;

      if (!original || original.trim() === "") {
        return res
          .status(400)
          .json({ error: "Original prompt cannot be empty" });
      }

      // Use either user ID from authenticated user or session ID for anonymous users
      const user_id = req.user ? req.user.id : req.sessionID;

      const prompt = await PromptModel.create({
        user_id,
        original,
        beginner,
        intermediate,
        advanced,
        public: isPublic,
      });

      return res.status(201).json(prompt);
    } catch (error) {
      console.error("Error saving prompt:", error);
      return res.status(500).json({ error: "Failed to save prompt" });
    }
  }

  /**
   * Get a prompt by ID
   */
  async getPrompt(req, res) {
    try {
      const { id } = req.params;
      const prompt = await PromptModel.getById(id);

      if (!prompt) {
        return res.status(404).json({ error: "Prompt not found" });
      }

      return res.status(200).json(prompt);
    } catch (error) {
      console.error("Error getting prompt:", error);
      return res.status(500).json({ error: "Failed to get prompt" });
    }
  }

  /**
   * Get public prompts
   */
  async getPublicPrompts(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const prompts = await PromptModel.getPublicPrompts(page, limit);

      return res.status(200).json(prompts);
    } catch (error) {
      console.error("Error getting public prompts:", error);
      return res.status(500).json({ error: "Failed to get public prompts" });
    }
  }

  /**
   * Get prompts by user
   */
  async getUserPrompts(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      // Use either user ID or session ID
      const userId = req.user ? req.user.id : req.sessionID;
      const prompts = req.user
        ? await PromptModel.getByUserId(userId, page, limit)
        : await PromptModel.getBySessionId(userId, page, limit);

      return res.status(200).json(prompts);
    } catch (error) {
      console.error("Error getting user prompts:", error);
      return res.status(500).json({ error: "Failed to get user prompts" });
    }
  }

  /**
   * Update a prompt
   */
  async updatePrompt(req, res) {
    try {
      const { id } = req.params;
      const prompt = await PromptModel.getById(id);

      if (!prompt) {
        return res.status(404).json({ error: "Prompt not found" });
      }

      // Check ownership
      const userId = req.user ? req.user.id : req.sessionID;
      if (prompt.user_id !== userId) {
        return res
          .status(403)
          .json({ error: "Not authorized to update this prompt" });
      }

      // Rename public to isPublic if it exists in the request body
      const updatedData = { ...req.body };
      if ("public" in updatedData) {
        updatedData.isPublic = updatedData.public;
        delete updatedData.public;
      }

      const updatedPrompt = await PromptModel.update(id, updatedData);

      return res.status(200).json(updatedPrompt);
    } catch (error) {
      console.error("Error updating prompt:", error);
      return res.status(500).json({ error: "Failed to update prompt" });
    }
  }

  /**
   * Delete a prompt
   */
  async deletePrompt(req, res) {
    try {
      const { id } = req.params;
      const prompt = await PromptModel.getById(id);

      if (!prompt) {
        return res.status(404).json({ error: "Prompt not found" });
      }

      // Check ownership
      const userId = req.user ? req.user.id : req.sessionID;
      if (prompt.user_id !== userId) {
        return res
          .status(403)
          .json({ error: "Not authorized to delete this prompt" });
      }

      await PromptModel.delete(id);

      return res.status(200).json({ message: "Prompt deleted successfully" });
    } catch (error) {
      console.error("Error deleting prompt:", error);
      return res.status(500).json({ error: "Failed to delete prompt" });
    }
  }

  /**
   * Fork a prompt
   */
  async forkPrompt(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user ? req.user.id : req.sessionID;

      const forkedPrompt = await PromptModel.fork(id, userId);

      return res.status(201).json(forkedPrompt);
    } catch (error) {
      console.error("Error forking prompt:", error);
      return res.status(500).json({ error: "Failed to fork prompt" });
    }
  }
}

module.exports = new PromptController();
