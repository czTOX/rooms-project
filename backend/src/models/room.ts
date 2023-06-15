import z from 'zod';
import { LocationCreateSchema } from './location';

export const RoomPostSchema = z.object({
  caption: z
    .string({ required_error: 'Missing `caption` parameter' })
    .nonempty(),
  description: z
    .string({ required_error: 'Missing `description` parameter' })
    .nonempty(),
  pricePerNight: z.coerce.number({
    required_error: 'Missing `pricePerNight` parameter',
  }),
  location: z.union([
    z.object({
      locationId: z
        .string({ required_error: 'Missing `locationId` parameter' })
        .nonempty(),
    }),
    LocationCreateSchema,
  ]),
  photosUrls: z
    .string({ required_error: 'Missing `photosUrls` parameter' })
    .nonempty(),
});

export const RoomCreateSchema = z
  .object({
    userId: z
      .string({ required_error: 'Missing `userId` parameter' })
      .nonempty(),
  })
  .merge(RoomPostSchema);

export const RoomSchema = z
  .object({
    id: z.string().nonempty(),
    locationId: z
      .string({ required_error: 'Missing `photosUrls` parameter' })
      .nonempty(),
  })
  .merge(RoomCreateSchema)
  .omit({ location: true });

export type RoomCreate = z.infer<typeof RoomCreateSchema>;
export type Room = z.infer<typeof RoomSchema>;
