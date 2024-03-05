import { z } from 'zod';

export const StudioCalloutApplicationSchema = z.object({
    accept: z.boolean(),
    reject: z.boolean(),
    studioCalloutId: z.number(),
    userId: z.number()
});

export type StudioCalloutApplication = z.infer<typeof StudioCalloutApplicationSchema>;