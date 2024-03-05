import { z } from 'zod';

export const StudioCalloutApplicationResponseSchema = z.object({
    id: z.number(),
    firstAidNCPR: z.boolean(),
    currentInsurance: z.boolean(),
    willingDistance: z.number(),
    mobile: z.string(),
    bank_BSB: z.string(),
    bank_Account: z.string(),
    userId: z.number(),
    longitude: z.number(),
    latitude: z.number()


});

export type StudioCalloutApplicationResponse = z.infer<typeof StudioCalloutApplicationResponseSchema>;
