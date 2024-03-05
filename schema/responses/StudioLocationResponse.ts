import { z } from 'zod';

export const StudioLocationResponseSchema = z.object({

    id: z.number(),
    name: z.string(),
    streetAddress: z.string(),
    contactName: z.string(),
    contactNo: z.string(),
    username: z.string(),
    lontitude: z.number(),
    latitude: z.number()
});

export type StudioLocationResponse = z.infer<typeof StudioLocationResponseSchema>;
