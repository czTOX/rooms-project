import z from "zod";

export const OfferPostSchema = z.object({
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
})

export const OfferCreateSchema = z.object({
    roomId: z.string(),
}).merge(OfferPostSchema)

export const OfferSchema = z.object({
    id: z.string().nonempty(),
}).merge(OfferCreateSchema)

export type OfferPost = z.infer<typeof OfferPostSchema>;
export type OfferCreate = z.infer<typeof OfferCreateSchema>;
export type Offer = z.infer<typeof OfferSchema>;