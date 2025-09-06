'use server';

/**
 * @fileOverview Template recommendation AI agent.
 *
 * - recommendTemplate - A function that recommends a website template based on user input.
 * - TemplateRecommendationInput - The input type for the recommendTemplate function.
 * - TemplateRecommendationOutput - The return type for the recommendTemplate function.
 */

import {z} from 'zod';
import OpenAI from 'openai';
import "dotenv/config";

const openrouter = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

const TemplateRecommendationInputSchema = z.object({
  industry: z.string().describe('The industry or type of website.'),
});
export type TemplateRecommendationInput = z.infer<typeof TemplateRecommendationInputSchema>;

const TemplateRecommendationOutputSchema = z.object({
  templateName: z.string().describe('The name of the recommended template.'),
  templateDescription: z.string().describe('A brief description of the template.'),
  templateImageUrl: z.string().describe('A URL of an image of the template.'),
});
export type TemplateRecommendationOutput = z.infer<typeof TemplateRecommendationOutputSchema>;

export async function recommendTemplate(input: TemplateRecommendationInput): Promise<TemplateRecommendationOutput> {
    const completion = await openrouter.chat.completions.create({
      model: 'moonshotai/kimi-vl-a3b-thinking:free',
      messages: [
        {
            role: 'system',
            content: `You are a website template recommendation expert. You must reply with a JSON object that matches the following schema:
${JSON.stringify(TemplateRecommendationOutputSchema)}`,
        },
        {
          role: 'user',
          content: `Based on the industry provided, recommend a website template.

Industry: ${input.industry}`,
        },
      ],
      response_format: { type: 'json_object' },
    });

    const rawJson = completion.choices[0].message.content;
    if (!rawJson) {
        throw new Error("Received empty response from AI");
    }
    const parsed = JSON.parse(rawJson);
    const result = TemplateRecommendationOutputSchema.parse(parsed);

    // Ensure the image URL is valid, otherwise use a placeholder.
    if (!result.templateImageUrl.startsWith('http')) {
        result.templateImageUrl = 'https://picsum.photos/600/400';
    }
    
    return result;
}
