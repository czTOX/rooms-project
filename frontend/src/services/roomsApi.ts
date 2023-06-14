import { Room, NewRoom, ResponseMulti, ResponseSingle, Filter } from "../models";
import axiosInstance from "./base";


export const getFiltered = async (filter: Filter): Promise<ResponseMulti<Room>> => {
    const response = await axiosInstance.post('/rooms', {...filter});
    return response.data;
}

export const getSingle = async (roomId: string): Promise<ResponseSingle<Room>> => {
    const response = await axiosInstance.get(`/rooms/${roomId}`);
    return response.data;
}

export const createRoom = async (content: NewRoom): Promise<ResponseSingle<Room>> => {
    const response = await axiosInstance.post('/rooms', {content});
    return response.data;
}