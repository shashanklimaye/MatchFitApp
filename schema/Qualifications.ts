import { z } from 'zod';

export const QualificationsSchema = z.object({
    qualifications: z.array(z.string()).nonempty()
});

export type Qualifications = z.infer<typeof QualificationsSchema>;