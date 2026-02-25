import { GoogleGenAI } from "@google/genai";
import OpenAI from "openai";
import { store } from '../store';

class AgentService {
  private geminiAi: GoogleGenAI | null = null;
  private openaiAi: OpenAI | null = null;
  private provider: string = '';

  initialize() {
    this.geminiAi = null;
    this.openaiAi = null;
    this.provider = '';

    const config = store.getConfig();
    if (!config.apiKey) return;

    this.provider = config.provider || 'gemini';

    try {
      if (this.provider === 'openai') {
        this.openaiAi = new OpenAI({ apiKey: config.apiKey });
        store.addLog('Agent initialized with OpenAI API', 'success');
      } else if (this.provider === 'gemini') {
        this.geminiAi = new GoogleGenAI({ apiKey: config.apiKey });
        store.addLog('Agent initialized with Gemini API', 'success');
      } else {
        this.openaiAi = new OpenAI({ apiKey: config.apiKey });
        store.addLog(`Agent initialized with ${this.provider} API (using OpenAI-compatible mode)`, 'success');
      }
    } catch (error) {
      store.addLog(`Failed to initialize Agent: ${error}`, 'error');
    }
  }

  private isInitialized(): boolean {
    return this.geminiAi !== null || this.openaiAi !== null;
  }

  async generateResponse(prompt: string): Promise<string> {
    if (!this.isInitialized()) {
      this.initialize();
      if (!this.isInitialized()) return "Agent not configured. Please check API Key.";
    }

    try {
      if (this.provider === 'gemini' && this.geminiAi) {
        const response = await this.geminiAi.models.generateContent({
          model: "gemini-2.0-flash",
          contents: prompt,
        });
        return response.text || "I couldn't generate a response.";
      } else if (this.openaiAi) {
        const model = this.provider === 'openai' ? 'gpt-4o-mini' :
                      this.provider === 'groq' ? 'llama-3.1-8b-instant' :
                      this.provider === 'anthropic' ? 'claude-3-haiku-20240307' :
                      'gpt-4o-mini';

        const response = await this.openaiAi.chat.completions.create({
          model,
          messages: [{ role: 'user', content: prompt }],
        });
        return response.choices[0]?.message?.content || "I couldn't generate a response.";
      }

      return "Agent not configured. Please check API Key.";
    } catch (error) {
      store.addLog(`Agent Error: ${error}`, 'error');
      return "I encountered an error processing your request.";
    }
  }
}

export const agentService = new AgentService();
