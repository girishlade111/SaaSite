'use server';

/**
 * @fileOverview Template recommendation AI agent.
 *
 * - recommendTemplate - A function that recommends a website template based on user input.
 * - TemplateRecommendationInput - The input type for the recommendTemplate function.
 * - TemplateRecommendationOutput - The return type for the recommendTemplate function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

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
  return recommendTemplateFlow(input);
}

const prompt = ai.definePrompt({
  name: 'templateRecommendationPrompt',
  input: {schema: TemplateRecommendationInputSchema},
  output: {schema: TemplateRecommendationOutputSchema},
  prompt: `You are a website template recommendation expert.

  Based on the industry provided, recommend a website template.

  Industry: {{{industry}}}
  `,
});

const recommendTemplateFlow = ai.defineFlow(
  {
    name: 'recommendTemplateFlow',
    inputSchema: TemplateRecommendationInputSchema,
    outputSchema: TemplateRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
