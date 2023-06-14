import { z } from "zod";

export const NewBookingSchema = z.object({
    startDate: z.string(),
    endDate: z.string(),
    totalPrice: z.number(),
})

export const BookingSchema = z.object({
    id: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    totalPrice: z.number(),
    userId: z.string(),
    roomId: z.string(),
})

export type NewBooking = z.infer<typeof NewBookingSchema>;
export type Booking = z.infer<typeof BookingSchema>;