'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const messageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

export type Message = z.infer<typeof messageSchema>;

const settingsSchema = z.object({
  temperature: z.number().min(0).max(1),
  responseLength: z.enum(['short', 'medium', 'long']),
  responseStyle: z.enum(['formal', 'casual', 'poetic']),
});

export type ChatSettings = z.infer<typeof settingsSchema>;

function createSystemPrompt(settings: ChatSettings): string {
  const prompts = [];
  if (settings.responseLength) {
    prompts.push(`Keep your responses ${settings.responseLength}.`);
  }
  if (settings.responseStyle) {
    prompts.push(`Adopt a ${settings.responseStyle} tone.`);
  }
  return prompts.join(' ');
}

export async function getAiResponse(
  history: Message[],
  settings: ChatSettings
) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return { success: false, response: 'The GEMINI_API_KEY environment variable is not set. Please add it to your .env file.' };
    }

    const validatedHistory = z.array(messageSchema).parse(history);
    const validatedSettings = settingsSchema.parse(settings);

    const currentPrompt = validatedHistory[validatedHistory.length - 1]?.content || '';
    const conversationHistory = validatedHistory.slice(0, -1);
    const systemPrompt = createSystemPrompt(validatedSettings);

    const fullHistory = systemPrompt
      ? [{ role: 'user' as const, content: systemPrompt }, { role: 'model' as const, content: 'Understood. I will follow these instructions.' }, ...conversationHistory]
      : conversationHistory;

    const { text } = await ai.generate({
      prompt: currentPrompt,
      history: fullHistory,
      config: {
        temperature: validatedSettings.temperature,
      },
    });

    return { success: true, response: text };
  } catch (error: any) {
    console.error('Error getting AI response:', error);
    if (error instanceof z.ZodError) {
      return { success: false, response: 'Invalid data format.' };
    }
    const errorMessage = error.message || 'An error occurred. Please check your API key and try again.';
    return { success: false, response: errorMessage };
  }
}
