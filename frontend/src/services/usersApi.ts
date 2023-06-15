import {
  UserLogin,
  UserRegistraion,
  ResponseSingle,
  User,
  BookingResponse,
  MyRoomsResponse,
} from '../models';
import axiosInstance from './base';

export const loginUser = async (
  content: UserLogin
): Promise<ResponseSingle<User>> => {
  const response = await axiosInstance.post('/users/login', { ...content });
  return response.data;
};

export const logoutUser = async (): Promise<ResponseSingle<string>> => {
  const response = await axiosInstance.post('/users/logout');
  return response.data;
};

export const registerUser = async (
  content: UserRegistraion
): Promise<ResponseSingle<User>> => {
  const response = await axiosInstance.post('/users/register', { ...content });
  return response.data;
};

export const getMyRooms = async (): Promise<
  ResponseSingle<MyRoomsResponse>
> => {
  const response = await axiosInstance.get(`/users/rooms`);
  return response.data;
};

export const getBookings = async (): Promise<
  ResponseSingle<BookingResponse>
> => {
  const response = await axiosInstance.get(`/users/bookings`);
  return response.data;
};

export const getBookingsHistory = async (): Promise<
  ResponseSingle<BookingResponse>
> => {
  const response = await axiosInstance.get(`/users/bookings/history`);
  return response.data;
};
