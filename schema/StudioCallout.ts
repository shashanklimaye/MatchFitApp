import { z } from 'zod';

export const StudioCalloutSchema = z.object({
    id: z.number(),
    instructorType: z.string(),
    studioLocationId: z.number(),
    studioLocationAddress: z.string(),
    note: z.string(),
    isClosed: z.boolean(),
    calloutDateTimes: z.array(z.date())
});

export type StudioCallout = z.infer<typeof StudioCalloutSchema>;
