import { GoogleGenAI } from "@google/genai";
import { store } from '../store';

class AgentService {
  private ai: GoogleGenAI | null = null;

  initialize() {
    this.ai = null;
    const config = store.getConfig();
    if (config.apiKey) {
      try {
        this.ai = new GoogleGenAI({ apiKey: config.apiKey });
        store.addLog(`Agent initialized with ${config.provider || 'gemini'} API`, 'success');
      } catch (error) {
        store.addLog(`Failed to initialize Agent: ${error}`, 'error');
      }
    }
  }

  async generateResponse(prompt: string): Promise<string> {
    if (!this.ai) {
      this.initialize();
      if (!this.ai) return "Agent not configured. Please check API Key.";
    }

    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
      });
      return response.text || "I couldn't generate a response.";
    } catch (error) {
      store.addLog(`Agent Error: ${error}`, 'error');
      return "I encountered an error processing your request.";
    }
  }
}

export const agentService = new AgentService();
