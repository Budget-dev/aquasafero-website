'use server';
/**
 * @fileOverview A Genkit flow for generating script concepts based on lighting styles and film genres.
 *
 * - generateScriptConcept - A function that orchestrates the generation of storytelling hooks and detailed scene directions.
 * - GenerateScriptConceptInput - The input type for the generateScriptConcept function.
 * - GenerateScriptConceptOutput - The return type for the generateScriptConcept function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateScriptConceptInputSchema = z.object({
  lightingStyle: z
    .string()
    .describe('The desired lighting style for the script concept (e.g., "noir", "natural light", "high-key", "low-key").'),
  filmGenre: z
    .string()
    .describe('The desired film genre for the script concept (e.g., "sci-fi", "thriller", "romantic comedy", "historical drama").'),
});
export type GenerateScriptConceptInput = z.infer<typeof GenerateScriptConceptInputSchema>;

const GenerateScriptConceptOutputSchema = z.object({
  storytellingHooks: z
    .array(z.string())
    .describe('Three unique and intriguing storytelling hooks for the script concept.'),
  sceneDirections: z
    .string()
    .describe('Detailed scene directions for a pivotal scene, emphasizing how the lighting style enhances the atmosphere and narrative.'),
});
export type GenerateScriptConceptOutput = z.infer<typeof GenerateScriptConceptOutputSchema>;

export async function generateScriptConcept(
  input: GenerateScriptConceptInput
): Promise<GenerateScriptConceptOutput> {
  return generateScriptConceptFlow(input);
}

const scriptConceptPrompt = ai.definePrompt({
  name: 'scriptConceptPrompt',
  input: {schema: GenerateScriptConceptInputSchema},
  output: {schema: GenerateScriptConceptOutputSchema},
  prompt: `You are an expert screenwriter and film director, known for your ability to craft visually rich and narratively compelling stories. Your task is to generate unique storytelling hooks and detailed scene directions for a new script concept.

Focus on how the specified lighting style dramatically impacts the mood, character perception, and overall narrative. The generated content must deeply integrate both the lighting style and the film genre.

Lighting Style: {{{lightingStyle}}}
Film Genre: {{{filmGenre}}}

Please provide:
1.  **Storytelling Hooks**: Three distinct, intriguing hooks that capture the essence of a potential film in this style and genre.
2.  **Scene Directions**: Detailed, evocative scene directions for a pivotal moment in the story. Describe the setting, character actions, and dialogue snippets (if relevant), ensuring the lighting style is a central element in building atmosphere and conveying meaning.`,
});

const generateScriptConceptFlow = ai.defineFlow(
  {
    name: 'generateScriptConceptFlow',
    inputSchema: GenerateScriptConceptInputSchema,
    outputSchema: GenerateScriptConceptOutputSchema,
  },
  async (input) => {
    const {output} = await scriptConceptPrompt(input);
    return output!;
  }
);
