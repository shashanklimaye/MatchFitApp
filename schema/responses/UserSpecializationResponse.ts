import { z } from 'zod';

export const userSpecializationResponseSchema = z.object({
    id: z.number(),
    name: z.string(),
    users: z.array(z.string())
});

export type UserSpecializationResponse = z.infer<typeof userSpecializationResponseSchema>;