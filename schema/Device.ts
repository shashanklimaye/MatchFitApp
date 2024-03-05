import { z } from 'zod';

export const DeviceSchema = z.object({
    deviceType: z.nativeEnum(),
    deviceIdentifier: z.string(),
    username: z.string()
});

export type Device = z.infer<typeof DeviceSchema>;