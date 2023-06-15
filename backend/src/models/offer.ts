import z from 'zod';

export const OfferPostSchema = z.object({
  startDate: z.coerce.date({ required_error: 'Missing `startDate` parameter' }),
  endDate: z.coerce.date({ required_error: 'Missing `endDate` parameter' }),
});

export const OfferCreateSchema = z
  .object({
    roomId: z
      .string({ required_error: 'Missing `roomId` parameter' })
      .nonempty(),
  })
  .merge(OfferPostSchema);

export const OfferSchema = z
  .object({
    id: z.string().nonempty(),
  })
  .merge(OfferCreateSchema);

export type OfferCreate = z.infer<typeof OfferCreateSchema>;
export type Offer = z.infer<typeof OfferSchema>;
