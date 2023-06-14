import z from "zod";
import {UserSchema} from "./user";
import {RoomSchema} from "./room";

export const BookingPostSchema = z.object({
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    totalPrice: z.number(),
    roomId: z.string(),
})

export const BookingCreateSchema = z.object({
    userId: z.string(),
}).merge(BookingPostSchema)

export const BookingSchema = z.object({
    id: z.string().nonempty(),
}).merge(BookingCreateSchema)

export const BookingUserSchema = z.object({
    user: UserSchema,
    room: RoomSchema
}).merge(BookingSchema)


export type BookingPost = z.infer<typeof BookingPostSchema>;
export type BookingCreate = z.infer<typeof BookingCreateSchema>;
export type Booking = z.infer<typeof BookingSchema>;
export type BookingUser = z.infer<typeof BookingUserSchema>;
