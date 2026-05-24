'use server';
/**
 * @fileOverview A GenAI tool for directors to generate professional cinematic visual treatments
 * and atmosphere descriptions from a brief story premise.
 *
 * - generateVisionTreatment - A function that handles the generation process.
 * - VisionAITreatmentGeneratorInput - The input type for the generateVisionTreatment function.
 * - VisionAITreatmentGeneratorOutput - The return type for the generateVisionTreatment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VisionAITreatmentGeneratorInputSchema = z.object({
  storyPremise: z
    .string()
    .describe('A brief story premise for which to generate a cinematic visual treatment.'),
});
export type VisionAITreatmentGeneratorInput = z.infer<
  typeof VisionAITreatmentGeneratorInputSchema
>;

const VisionAITreatmentGeneratorOutputSchema = z.object({
  cinematicTreatment: z
    .string()
    .describe(
      'A detailed cinematic visual treatment including camera work, lighting, color palette, and visual motifs.'
    ),
  atmosphereDescription: z
    .string()
    .describe('A rich description of the overall atmosphere and emotional tone of the film.'),
});
export type VisionAITreatmentGeneratorOutput = z.infer<
  typeof VisionAITreatmentGeneratorOutputSchema
>;

export async function generateVisionTreatment(
  input: VisionAITreatmentGeneratorInput
): Promise<VisionAITreatmentGeneratorOutput> {
  return generateVisionTreatmentFlow(input);
}

const generateVisionTreatmentPrompt = ai.definePrompt({
  name: 'generateVisionTreatmentPrompt',
  input: {schema: VisionAITreatmentGeneratorInputSchema},
  output: {schema: VisionAITreatmentGeneratorOutputSchema},
  prompt: `You are an AI assistant specialized in generating professional cinematic visual treatments and atmosphere descriptions for directors.
Your goal is to translate a brief story premise into vivid, detailed descriptions that capture the essence of the film's visual and emotional landscape. Focus on camera work, lighting, color palette, sound design implications, and overall mood.

Story Premise: {{{storyPremise}}}

Your output should be a JSON object with the following structure, adhering strictly to the descriptions:
\`\`\`json
{{json_schema (output.schema)}}
\`\`\`
`,
});

const generateVisionTreatmentFlow = ai.defineFlow(
  {
    name: 'generateVisionTreatmentFlow',
    inputSchema: VisionAITreatmentGeneratorInputSchema,
    outputSchema: VisionAITreatmentGeneratorOutputSchema,
  },
  async (input) => {
    const {output} = await generateVisionTreatmentPrompt(input);
    if (!output) {
      throw new Error('Failed to generate cinematic treatment and atmosphere description.');
    }
    return output;
  }
);
