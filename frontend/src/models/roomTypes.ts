import { z } from 'zod';

export interface Room {
  id: string;
  caption: string;
  description: string;
  pricePerNight: number;
  photosUrls: string;
  location: {
    id: string;
    name: string;
    city: string;
    zip: string;
    street: string;
    country: string;
  };
}

export interface RoomOffers {
  id: string;
  caption: string;
  description: string;
  pricePerNight: number;
  photosUrls: string;
  location: {
    id: string;
    name: string;
    city: string;
    zip: string;
    street: string;
    country: string;
  };
  offers: [Offer];
}

export interface Offer {
  startDate: string;
  endDate: string;
}

export interface MyRoomsResponse {
  id: string;
  rooms: [Room];
}

export interface NewRoom {
  caption: string;
  description: string;
  pricePerNight: number;
  location: {
    name: string;
    city: string;
    zip: string;
    street: string;
    country: string;
  };
  photosUrls: string;
  //images: FileList,
}

const FilterSchema = z.object({
  search: z.string(),
  location: z.string(),
  minPrice: z.string(),
  maxPrice: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  sort: z.string(),
});

const FilterDatesSchema = z.object({
  startDate: z.date().nullable(),
  endDate: z.date().nullable(),
});

export type Filter = z.infer<typeof FilterSchema>;
export type FilterDates = z.infer<typeof FilterDatesSchema>;
