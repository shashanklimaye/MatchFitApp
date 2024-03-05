import { z } from 'zod';
import { Role } from '../constants/enums';

export const UserStateSchema = z.object({
    username: z.string(),
    id: z.number(),
    token: z.string(),
    role: z.nativeEnum(Role),
    isSetup: z.boolean(),
});

export type UserState = z.infer<typeof UserStateSchema>;