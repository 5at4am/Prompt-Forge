const { getDb } = require('../database/db');
const { v4: uuidv4 } = require('uuid');

class InteractionModel {
  /**
   * Add a comment to a prompt
   */
  static async addComment(commentData) {
    const db = await getDb();
    const id = uuidv4();
    const { prompt_id, user_id, text } = commentData;

    await db.run(
      `INSERT INTO comments (id, prompt_id, user_id, text)
       VALUES (?, ?, ?, ?)`,
      [id, prompt_id, user_id, text]
    );

    return this.getCommentById(id);
  }

  /**
   * Get comment by ID
   */
  static async getCommentById(id) {
    const db = await getDb();
    return db.get(
      `SELECT c.*, u.username
       FROM comments c
       LEFT JOIN users u ON c.user_id = u.id
       WHERE c.id = ?`,
      [id]
    );
  }

  /**
   * Get comments for a prompt
   */
  static async getCommentsByPromptId(promptId, page = 1, limit = 10) {
    const db = await getDb();
    const offset = (page - 1) * limit;

    return db.all(
      `SELECT c.*, u.username
       FROM comments c
       LEFT JOIN users u ON c.user_id = u.id
       WHERE c.prompt_id = ?
       ORDER BY c.created_at DESC
       LIMIT ? OFFSET ?`,
      [promptId, limit, offset]
    );
  }

  /**
   * Like a prompt
   */
  static async likePrompt(likeData) {
    const db = await getDb();
    const id = uuidv4();
    const { prompt_id, user_id } = likeData;

    try {
      await db.run(
        `INSERT INTO likes (id, prompt_id, user_id)
         VALUES (?, ?, ?)`,
        [id, prompt_id, user_id]
      );

      return { id, prompt_id, user_id, success: true };
    } catch (error) {
      // If the user already liked this prompt
      if (error.message.includes('UNIQUE constraint failed')) {
        return { success: false, message: 'You already liked this prompt' };
      }
      throw error;
    }
  }

  /**
   * Unlike a prompt
   */
  static async unlikePrompt(prompt_id, user_id) {
    const db = await getDb();

    const result = await db.run(
      'DELETE FROM likes WHERE prompt_id = ? AND user_id = ?',
      [prompt_id, user_id]
    );

    return { success: result.changes > 0 };
  }

  /**
   * Check if a user liked a prompt
   */
  static async hasUserLiked(prompt_id, user_id) {
    const db = await getDb();

    const like = await db.get(
      'SELECT id FROM likes WHERE prompt_id = ? AND user_id = ?',
      [prompt_id, user_id]
    );

    return !!like;
  }

  /**
   * Count likes for a prompt
   */
  static async countLikes(prompt_id) {
    const db = await getDb();

    const result = await db.get(
      'SELECT COUNT(*) as count FROM likes WHERE prompt_id = ?',
      [prompt_id]
    );

    return result.count;
  }
}

module.exports = InteractionModel;
