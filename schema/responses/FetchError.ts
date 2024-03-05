import { z } from 'zod';

export const FetchErrorSchema = z.object({
    code: z.string(),
    summary: z.string(),
    message: z.string(),
});

export type FetchError = z.infer<typeof FetchErrorSchema>;
