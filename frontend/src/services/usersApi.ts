import { UserLogin, UserRegistraion, ResponseSingle, ResponseMulti, Room, User } from "../models";
import axiosInstance from "./base";

//TODO: upravit vsechny funkce

export const loginUser = async (content: UserLogin): Promise<ResponseSingle<User>> => {
    const response = await axiosInstance.post('/users/login', {content});
    return response.data;
}

export const logoutUser = async (): Promise<ResponseSingle<string>> => {
    const response = await axiosInstance.post('/users/logout');
    return response.data;
}

export const registerUser = async (content: UserRegistraion): Promise<ResponseSingle<User>> => {
    const response = await axiosInstance.post('/users/register', {content});
    return response.data;
}

export const getMyRooms = async (userId: string): Promise<ResponseMulti<Room>> => {
    const response = await axiosInstance.get(`/users/${userId}/rooms`);
    return response.data;
}

export const getBookings = async (userId: string): Promise<ResponseMulti<Room>> => {
    const response = await axiosInstance.get(`/users/${userId}/bookings`);
    return response.data;
}