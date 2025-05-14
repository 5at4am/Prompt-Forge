const axios = require("axios");

class AiService {
  constructor() {
    this.apiKey = process.env.OPENROUTER_API_KEY;
    this.baseUrl = "https://openrouter.ai/api/v1";
  }

  /**
   * Enhance a prompt using OpenRouter API
   * @param {string} originalPrompt - The original user prompt
   * @returns {Promise<Object>} - Enhanced prompts at different levels
   */
  async enhancePrompt(originalPrompt) {
    try {
      const systemPrompt = `You are an elite prompt engineer who helps users upgrade their simple prompt ideas into high-performance prompts for AI models.

Given a basic prompt idea, generate three progressively advanced versions:

1. Beginner Version – A lightly refined prompt:
   - Improves clarity, intent, and flow
   - Adds a basic structure
   - Suitable for casual users or beginners

2. Intermediate Version – A more detailed prompt:
   - Provides clear instructions and meaningful context
   - Includes relevant examples
   - Suggests output formatting and structure
   - Designed for consistent and usable responses

3. Advanced Version – A highly optimized prompt using expert-level techniques:
   - Chain-of-thought or step-by-step reasoning
   - Multi-step or recursive task decomposition
   - Output formatting constraints (e.g., Markdown, tables, JSON)
   - Embedded quality assurance (fallback logic, validation steps)
   - Instruction tuning for precision, tone, and scope

Your response must strictly be a **single valid JSON object** with the following structure:
{
  "beginner": "Beginner-level version of the prompt",
  "intermediate": "Intermediate-level version of the prompt",
  "advanced": "Advanced-level version of the prompt"
}

Only return the JSON object. Do not include any explanations, notes, or additional content.`;

      const response = await axios.post(
        `${this.baseUrl}/chat/completions`,
        {
          model: "openai/gpt-3.5-turbo",
          messages: [
            { role: "system", content: systemPrompt },
            {
              role: "user",
              content: `Enhance this prompt idea: "${originalPrompt}"`,
            },
          ],
          temperature: 0.7,
          max_tokens: 1500,
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );
      // Extract the JSON from the response
      const content = response.data.choices[0].message.content;
      const enhancedPrompts = JSON.parse(content);

      return {
        original: originalPrompt,
        beginner: enhancedPrompts.beginner || "",
        intermediate: enhancedPrompts.intermediate || "",
        advanced: enhancedPrompts.advanced || "",
      };
    } catch (error) {
      if (error instanceof SyntaxError) {
        console.error("Error parsing AI response:", error);
        throw new Error("Failed to parse AI response");
      }
      console.error("AI Service Error:", error.response?.data || error.message);
      throw new Error("Failed to enhance prompt");
    }
  }
}

module.exports = new AiService();
