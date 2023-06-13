import { Room, ResponseMulti, ResponseSingle } from "../models";
import axiosInstance from "./base";

//TODO: upravit vsechny funkce

export const getAll = async (): Promise<ResponseMulti<Room>> => {
    const response = await axiosInstance.get('/rooms');
    return response.data;
}

export const getSingle = async (roomId: string): Promise<ResponseSingle<Room>> => {
    const response = await axiosInstance.get(`/rooms/${roomId}`);
    return response.data;
}

export const createRoom = async (content: Room): Promise<ResponseSingle<Room>> => {
    const response = await axiosInstance.post('/rooms/new', {content});
    return response.data;
}