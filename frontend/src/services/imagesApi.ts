import { ResponseSingle } from '../models';
import axiosInstance from './base';

export const getImage = async (id: string): Promise<ResponseSingle<string>> => {
  const response = await axiosInstance.post(`/images/${id}`);
  return response.data;
};
