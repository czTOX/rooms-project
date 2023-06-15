import { NewBooking, ResponseSingle } from '../models';
import axiosInstance from './base';

export const bookRoom = async (
  content: NewBooking
): Promise<ResponseSingle<NewBooking>> => {
  const response = await axiosInstance.post('/bookings', { ...content });
  return response.data;
};
