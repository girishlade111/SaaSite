'use server';

/**
 * @fileOverview AI-powered content generation for website blocks.
 *
 * - generateContent - A function that generates content for a given block type and website theme.
 * - ContentGenerationInput - The input type for the generateContent function.
 * - ContentGenerationOutput - The return type for the generateContent function.
 */
import {z} from 'zod';
import OpenAI from 'openai';

const openrouter = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

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
  const completion = await openrouter.chat.completions.create({
    model: 'moonshotai/kimi-vl-a3b-thinking:free',
    messages: [
        {
            role: 'system',
            content: `You are an AI assistant that generates content for website blocks.
You must reply with a JSON object that matches the following schema:
${JSON.stringify(ContentGenerationOutputSchema)}`,
        },
      {
        role: 'user',
        content: `Based on the type of block and the website's theme, provide a relevant content suggestion.

Block Type: ${input.blockType}
Website Theme: ${input.websiteTheme}`,
      },
    ],
    response_format: { type: 'json_object' },
  });

  const rawJson = completion.choices[0].message.content;
  if (!rawJson) {
      throw new Error("Received empty response from AI");
  }
  const parsed = JSON.parse(rawJson);
  return ContentGenerationOutputSchema.parse(parsed);
}
