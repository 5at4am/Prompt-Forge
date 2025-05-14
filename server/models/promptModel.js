const { getDb } = require("../database/db");
const { v4: uuidv4 } = require("uuid");

class PromptModel {
  /**
   * Create a new prompt
   */
  static async create(promptData) {
    const db = await getDb();
    const id = uuidv4();
    const {
      user_id,
      original,
      beginner,
      intermediate,
      advanced,
      public: isPublic = true,
    } = promptData;

    await db.run(
      `INSERT INTO prompts (id, user_id, original, beginner, intermediate, advanced, public)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        user_id,
        original,
        beginner,
        intermediate,
        advanced,
        isPublic ? 1 : 0,
      ]
    );

    return this.getById(id);
  }

  /**
   * Get prompt by ID
   */
  static async getById(id) {
    const db = await getDb();
    return db.get("SELECT * FROM prompts WHERE id = ?", [id]);
  }

  /**
   * Get all public prompts with pagination
   */
  static async getPublicPrompts(page = 1, limit = 10) {
    const db = await getDb();
    const offset = (page - 1) * limit;

    const prompts = await db.all(
      `SELECT p.*,
              COUNT(DISTINCT c.id) as comment_count,
              COUNT(DISTINCT l.id) as like_count,
              u.username as creator_name
       FROM prompts p
       LEFT JOIN comments c ON p.id = c.prompt_id
       LEFT JOIN likes l ON p.id = l.prompt_id
       LEFT JOIN users u ON p.user_id = u.id
       WHERE p.public = 1
       GROUP BY p.id
       ORDER BY p.created_at DESC
       LIMIT ? OFFSET ?`,
      [limit, offset]
    );

    return prompts;
  }

  /**
   * Get prompts by user ID
   */
  static async getByUserId(userId, page = 1, limit = 10) {
    const db = await getDb();
    const offset = (page - 1) * limit;

    return db.all(
      `SELECT p.*,
              COUNT(DISTINCT c.id) as comment_count,
              COUNT(DISTINCT l.id) as like_count
       FROM prompts p
       LEFT JOIN comments c ON p.id = c.prompt_id
       LEFT JOIN likes l ON p.id = l.prompt_id
       WHERE p.user_id = ?
       GROUP BY p.id
       ORDER BY p.created_at DESC
       LIMIT ? OFFSET ?`,
      [userId, limit, offset]
    );
  }

  /**
   * Get prompts by session ID (for anonymous users)
   */
  static async getBySessionId(sessionId, page = 1, limit = 10) {
    const db = await getDb();
    const offset = (page - 1) * limit;

    return db.all(
      `SELECT p.*,
              COUNT(DISTINCT c.id) as comment_count,
              COUNT(DISTINCT l.id) as like_count
       FROM prompts p
       LEFT JOIN comments c ON p.id = c.prompt_id
       LEFT JOIN likes l ON p.id = l.prompt_id
       WHERE p.user_id = ?
       GROUP BY p.id
       ORDER BY p.created_at DESC
       LIMIT ? OFFSET ?`,
      [sessionId, limit, offset]
    );
  }

  /**
   * Update an existing prompt
   */
  static async update(id, promptData) {
    const db = await getDb();
    const { beginner, intermediate, advanced, isPublic } = promptData;

    await db.run(
      `UPDATE prompts SET
         beginner = COALESCE(?, beginner),
         intermediate = COALESCE(?, intermediate),
         advanced = COALESCE(?, advanced),
         public = COALESCE(?, public)
       WHERE id = ?`,
      [
        beginner,
        intermediate,
        advanced,
        isPublic !== undefined ? (isPublic ? 1 : 0) : null,
        id,
      ]
    );

    return this.getById(id);
  }

  /**
   * Delete a prompt
   */
  static async delete(id) {
    const db = await getDb();
    await db.run("DELETE FROM comments WHERE prompt_id = ?", [id]);
    await db.run("DELETE FROM likes WHERE prompt_id = ?", [id]);
    await db.run("DELETE FROM prompts WHERE id = ?", [id]);
    return { deleted: true };
  }

  /**
   * Fork a prompt (create a copy for another user)
   */
  static async fork(promptId, userId) {
    const db = await getDb();
    const prompt = await this.getById(promptId);

    if (!prompt) {
      throw new Error("Prompt not found");
    }

    return this.create({
      user_id: userId,
      original: prompt.original,
      beginner: prompt.beginner,
      intermediate: prompt.intermediate,
      advanced: prompt.advanced,
      public: prompt.public === 1,
    });
  }
}

module.exports = PromptModel;
