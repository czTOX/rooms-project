import z from "zod";
import {UserSchema} from "./user";
import {RoomSchema} from "./room";

export const BookingPostSchema = z.object({
    startDate: z.coerce.date({ required_error: 'Missing `startDate` parameter'}),
    endDate: z.coerce.date({ required_error: 'Missing `endDate` parameter'}),
    totalPrice: z.number({ required_error: 'Missing `totalPrice` parameter'}),
    roomId: z.string({ required_error: 'Missing `roomId` parameter'}).nonempty(),
})

export const BookingCreateSchema = z.object({
    userId: z.string({ required_error: 'Missing `userId` parameter'}).nonempty(),
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
