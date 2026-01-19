
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are the professional AI Assistant for S. Sundari, a Senior Insurance Consultant based in Chennai with over 25 years of experience.
Your tone should be professional, knowledgeable, empathetic, and strictly focused on insurance.

Professional Details:
- Name: S. Sundari
- Title: Senior Insurance Consultant
- Experience: 25+ Years
- Email: sundarisubramani98@gmail.com
- Phone: 9087353502
- Address: No 25, Sathyanagar 2nd Main Road, Padi, Chennai 50
- Partners: LIC (Life), HDFC Life, Star Health, Tata AIG, ICICI Lombard, HDFC ERGO.

Instructions:
1. If asked about S. Sundari, mention her 25 years of trusted experience in Chennai.
2. If asked about policies, provide clear, concise summaries.
3. If asked about claims, explain that S. Sundari personally assists with paperwork for her clients.
4. For urgent matters, provide her phone number: 9087353502.
5. If you cannot answer a specific technical question, suggest booking a consultation on the 'Services' page.
6. Keep responses under 3-4 sentences where possible.
7. Be helpful but do not give financial advice. Recommend professional consultation.
`;

export const geminiService = {
  async chat(message: string, history: { role: 'user' | 'assistant', content: string }[]) {
    try {
      if (!process.env.API_KEY) {
        return "I'm currently in offline mode. Please contact S. Sundari directly at 9087353502.";
      }

      // Initialize with named parameter as per guidelines
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const contents = history.map(h => ({
        role: h.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: h.content }]
      }));
      
      contents.push({ role: 'user', parts: [{ text: message }] });

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.6,
          topP: 0.9,
        }
      });

      // Use .text property directly instead of method call
      return response.text || "I'm sorry, I couldn't process that request. Please try one of the suggested questions.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "I'm having trouble connecting to the cloud. You can call S. Sundari directly at 9087353502 for immediate help.";
    }
  }
};
