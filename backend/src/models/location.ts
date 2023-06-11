import z from "zod";

export const LocationCreateSchema = z.object({
    name: z.string(),
    city: z.string(),
    zip: z.string(),
    street: z.string(),
    country: z.string(),
})

export const LocationSchema = z.object({
    id: z.string().nonempty(),
}).merge(LocationCreateSchema)

export type LocationCreate = z.infer<typeof LocationCreateSchema>;
export type Location = z.infer<typeof LocationSchema>;