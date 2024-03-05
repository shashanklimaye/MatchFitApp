import { z } from 'zod';

export const userExistsResponseSchema = z.object({
    doesExist: z.boolean()
});

export type UserExistsResponse = z.infer<typeof userExistsResponseSchema>;
