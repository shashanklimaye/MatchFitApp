import { z } from 'zod';

export const SpecialisationSchema = z.object({
    id: z.number(),
    instructorType: z.string(),
    studioLocationId: z.number(),
    studioLocationAddress: z.string(),
    note: z.string(),
    isClosed: z.boolean(),
    calloutDateTimes: z.array(z.date())
});

export type Specialisation = z.infer<typeof SpecialisationSchema>;
