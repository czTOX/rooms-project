import { Room, NewRoom, ResponseMulti, ResponseSingle, Filter, Booking, BookingResponse, RoomOffers } from "../models";
import axiosInstance from "./base";


export const getFiltered = async (filter: Filter): Promise<ResponseMulti<Room>> => {
    const response = await axiosInstance.get('/rooms', {params: filter});
    return response.data;
}

export const getSingle = async (roomId: string): Promise<ResponseSingle<Room>> => {
    const response = await axiosInstance.get(`/rooms/${roomId}`);
    return response.data;
}

export const createRoom = async (content: NewRoom): Promise<ResponseSingle<Room>> => {

    const formData = new FormData();
    formData.append("caption", content.caption);
    formData.append("description", content.description);
    formData.append("pricePerNight", content.pricePerNight.toString());
    formData.append("location", JSON.stringify(content.location));
    for (let i = 0; i < content.images.length; i++) {
        const image = content.images[i];
        formData.append("images", image);
    }
    const response = await axiosInstance.post('/rooms', formData);
    return response.data;
}

export const getRoomOffers = async (roomId: string): Promise<ResponseSingle<RoomOffers>> => {
    const response = await axiosInstance.get(`/rooms/${roomId}/offers`);
    return response.data;
}