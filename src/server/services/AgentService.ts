import { GoogleGenAI } from "@google/genai";
import OpenAI from "openai";
import { store } from '../store';

const OPENAI_COMPATIBLE_PROVIDERS: Record<string, { baseURL: string; model: string; label: string }> = {
  openai: { baseURL: 'https://api.openai.com/v1', model: 'gpt-4o-mini', label: 'OpenAI' },
  groq: { baseURL: 'https://api.groq.com/openai/v1', model: 'llama-3.1-8b-instant', label: 'Groq' },
  openrouter: { baseURL: 'https://openrouter.ai/api/v1', model: 'openai/gpt-4o-mini', label: 'OpenRouter' },
  deepseek: { baseURL: 'https://api.deepseek.com/v1', model: 'deepseek-chat', label: 'DeepSeek' },
  mistral: { baseURL: 'https://api.mistral.ai/v1', model: 'mistral-small-latest', label: 'Mistral AI' },
  together: { baseURL: 'https://api.together.xyz/v1', model: 'meta-llama/Llama-3.1-8B-Instruct-Turbo', label: 'Together AI' },
  fireworks: { baseURL: 'https://api.fireworks.ai/inference/v1', model: 'accounts/fireworks/models/llama-v3p1-8b-instruct', label: 'Fireworks AI' },
  perplexity: { baseURL: 'https://api.perplexity.ai', model: 'sonar', label: 'Perplexity' },
  xai: { baseURL: 'https://api.x.ai/v1', model: 'grok-2-latest', label: 'xAI' },
  anthropic: { baseURL: 'https://api.openai.com/v1', model: 'gpt-4o-mini', label: 'Anthropic (placeholder compatibility mode)' },
};

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
      if (this.provider === 'gemini') {
        this.geminiAi = new GoogleGenAI({ apiKey: config.apiKey });
        store.addLog('Agent initialized with Gemini API', 'success');
        return;
      }

      const providerConfig = OPENAI_COMPATIBLE_PROVIDERS[this.provider] || OPENAI_COMPATIBLE_PROVIDERS.openai;
      this.openaiAi = new OpenAI({
        apiKey: config.apiKey,
        baseURL: providerConfig.baseURL,
      });
      store.addLog(`Agent initialized with ${providerConfig.label}`, 'success');
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
          model: 'gemini-2.0-flash',
          contents: prompt,
        });
        return response.text || "I couldn't generate a response.";
      }

      if (this.openaiAi) {
        const providerConfig = OPENAI_COMPATIBLE_PROVIDERS[this.provider] || OPENAI_COMPATIBLE_PROVIDERS.openai;
        const response = await this.openaiAi.chat.completions.create({
          model: providerConfig.model,
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
