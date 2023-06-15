export interface BookingResponse {
    id: string;
    hashedPassword: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    bookings: [Booking]
}

export interface Booking {
    id: string;
    startDate: string;
    endDate: string;
    totalPrice: number;
    userId: string;
    roomId: string;
    room: {
        id: string;
        caption: string;
        description: string;
        pricePerNight: number;
        photosUrls: string;
        locationId: string;
        userId: string;
    }
}

export interface NewBooking {
    startDate: string;
    endDate: string;
    totalPrice: number;
    roomId: string;
}