import { z } from 'zod';

export const SkillsSchema = z.object({
    specializations: z.array(z.string()).nonempty()
});

export type Skills = z.infer<typeof SkillsSchema>;