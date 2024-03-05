import { z } from 'zod';

export const InstructorProfileSchema = z.object({
    qualifications: z.array(z.string()).nonempty()
});

export type InstructorProfile = z.infer<typeof InstructorProfileSchema>;