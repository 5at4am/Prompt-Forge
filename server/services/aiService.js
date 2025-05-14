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
      const systemPrompt = `You are a professional prompt engineer who helps users improve their prompt ideas.
      Given a simple prompt idea, you will enhance it into three different versions:

      1. Beginner Version: A slightly improved version with basic structure, adding context and clarity.
      2. Intermediate Version: A comprehensive prompt with detailed instructions, context, examples, and formatting guidance.
      3. Expert Version: An advanced prompt with sophisticated techniques like chain-of-thought reasoning, multi-step instructions, format controls, and quality criteria.

      Format your response as a valid JSON object with the following structure:
      {
        "beginner": "The beginner version of the prompt",
        "intermediate": "The intermediate version of the prompt",
        "advanced": "The expert version of the prompt"
      }

      Only return the JSON and nothing else.`;

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
