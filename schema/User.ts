import { z } from 'zod';
import { Role } from '../constants/enums';
import { StudioLocationSchema, InstructorProfileSchema, SpecialisationSchema, DeviceSchema } from '.';

export const UserSchema= z.object({
    id: z.number(),
    firstName: z.string(),
    lastName: z.string(),
    username: z.string(),
    role: z.nativeEnum(Role),
    specializations: z.array(SpecialisationSchema),
    studioLocations:  z.array(StudioLocationSchema),
    instructorProfile: z.array(InstructorProfileSchema),
    device: z.array(DeviceSchema)

});

export type User = z.infer<typeof UserSchema>;
