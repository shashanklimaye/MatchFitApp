import { z } from 'zod';

export const StudioLocationSchema = z.object({
    id: z.number().optional(),
    streetAddress: z.string(),
    suburb: z.string(),
    state: z.string(),
    postcode: z.string()
});

export type StudioLocation = z.infer<typeof StudioLocationSchema>;