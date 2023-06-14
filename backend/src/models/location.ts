import z from "zod";

export const LocationCreateSchema = z.object({
    name: z.string({ required_error: 'Missing `name` parameter'}).nonempty(),
    city: z.string({ required_error: 'Missing `city` parameter'}).nonempty(),
    zip: z.string({ required_error: 'Missing `zip` parameter'}).nonempty(),
    street: z.string({ required_error: 'Missing `street` parameter'}).nonempty(),
    country: z.string({ required_error: 'Missing `country` parameter'}).nonempty(),
})
export const LocationSchema = z.object({
    id: z.string().nonempty(),
}).merge(LocationCreateSchema)

export type LocationCreate = z.infer<typeof LocationCreateSchema>;
export type Location = z.infer<typeof LocationSchema>;