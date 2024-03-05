import { z } from 'zod';

export const LocationValidityResponseSchema = z.object({
    result: z.object({
        verdict: z.object({

        }),
        address: z.object({
            formattedAddress: z.string(),
            postalAddress: z.object({

            }),
            addressComponents: z.array(z.object({
                componentName: z.object({
                    text: z.string(),
                    languageCode: z.string()
                })
            }))
        }),
        geocode: z.object({
            location: z.object({
                latitude: z.number(),
                longitude: z.number()
            })
        }),
        metadata: z.object({
            business: z.boolean(),
            residential: z.boolean(),
        })
    }),
    responseId: z.string()
});

export type LocationValidityResponse = z.infer<typeof LocationValidityResponseSchema>;