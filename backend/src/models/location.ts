import z from "zod";

export const LocationSchema = z.object({
    id: z.string().nonempty(),
    name: z.string(),
    city: z.string(),
    zip: z.string(),
    street: z.string(),
    country: z.string(),
});

export type Location = z.infer<typeof LocationSchema>;