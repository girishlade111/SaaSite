'use server';

/**
 * @fileOverview AI-powered content generation for website blocks.
 *
 * - generateContent - A function that generates content for a given block type and website theme.
 * - ContentGenerationInput - The input type for the generateContent function.
 * - ContentGenerationOutput - The return type for the generateContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ContentGenerationInputSchema = z.object({
  blockType: z
    .string()
    .describe('The type of content block (e.g., header, product description).'),
  websiteTheme: z.string().describe('The overall theme of the website.'),
});
export type ContentGenerationInput = z.infer<typeof ContentGenerationInputSchema>;

const ContentGenerationOutputSchema = z.object({
  suggestedContent: z
    .string()
    .describe('The AI-generated content suggestion for the block.'),
});
export type ContentGenerationOutput = z.infer<typeof ContentGenerationOutputSchema>;

export async function generateContent(input: ContentGenerationInput): Promise<ContentGenerationOutput> {
  return generateContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'contentGenerationPrompt',
  input: {schema: ContentGenerationInputSchema},
  output: {schema: ContentGenerationOutputSchema},
  prompt: `You are an AI assistant that generates content for website blocks.

  Based on the type of block and the website's theme, provide a relevant content suggestion.

  Block Type: {{{blockType}}}
  Website Theme: {{{websiteTheme}}}

  Content Suggestion:`,
});

const generateContentFlow = ai.defineFlow(
  {
    name: 'generateContentFlow',
    inputSchema: ContentGenerationInputSchema,
    outputSchema: ContentGenerationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
