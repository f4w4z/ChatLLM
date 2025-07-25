'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating an initial prompt for general conversation with the LLM.
 *
 * @exports generateInitialPrompt - An async function that returns a default prompt for general conversation.
 * @exports InitialPromptOutput - The output type for the generateInitialPrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InitialPromptOutputSchema = z.object({
  prompt: z.string().describe('A default prompt for general conversation with the LLM.'),
});
export type InitialPromptOutput = z.infer<typeof InitialPromptOutputSchema>;

async function generateInitialPrompt(): Promise<InitialPromptOutput> {
  return initialPromptFlow({});
}

export {generateInitialPrompt};

const initialPrompt = ai.definePrompt({
  name: 'initialPrompt',
  output: {schema: InitialPromptOutputSchema},
  prompt: `You are a helpful and friendly AI assistant.  Provide a short greeting to the user, and ask them what they would like to talk about.`,
});

const initialPromptFlow = ai.defineFlow(
  {
    name: 'initialPromptFlow',
    outputSchema: InitialPromptOutputSchema,
  },
  async () => {
    const {output} = await initialPrompt({});
    return output!;
  }
);
