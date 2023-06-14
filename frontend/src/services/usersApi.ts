import { UserLogin, UserRegistraion, ResponseSingle, ResponseMulti, Room, User, Booking } from "../models";
import axiosInstance from "./base";


export const loginUser = async (content: UserLogin): Promise<ResponseSingle<User>> => {
    const response = await axiosInstance.post('/users/login', {...content});
    return response.data;
}

export const logoutUser = async (): Promise<ResponseSingle<string>> => {
    const response = await axiosInstance.post('/users/logout');
    return response.data;
}

export const registerUser = async (content: UserRegistraion): Promise<ResponseSingle<User>> => {
    const response = await axiosInstance.post('/users/register', {...content});
    return response.data;
}

export const getMyRooms = async (): Promise<ResponseMulti<Room>> => {
    const response = await axiosInstance.get(`/users/rooms`);
    return response.data;
}

export const getBookings = async (): Promise<ResponseMulti<Booking>> => {
    const response = await axiosInstance.get(`/users/bookings`);
    return response.data;
}

export const getBookingsHistory = async (): Promise<ResponseMulti<Booking>> => {
    const response = await axiosInstance.get(`/users/bookings/history`);
    return response.data;
}