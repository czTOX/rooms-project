import {
  Room,
  NewRoom,
  ResponseMulti,
  ResponseSingle,
  Filter,
  RoomOffers,
  Offer,
} from '../models';
import axiosInstance from './base';

export const getFiltered = async (
  filter: Filter
): Promise<ResponseMulti<Room>> => {
  const response = await axiosInstance.get('/rooms', { params: filter });
  return response.data;
};

export const getSingle = async (
  roomId: string
): Promise<ResponseSingle<Room>> => {
  const response = await axiosInstance.get(`/rooms/${roomId}`);
  return response.data;
};

export const createRoom = async (
  content: NewRoom
): Promise<ResponseSingle<Room>> => {
  // const formData = new FormData();
  // const newStruc = {
  //     caption: content.caption,
  //     description: content.description,
  //     pricePerNight: content.pricePerNight,
  //     location: content.location
  // }
  // const bodyJson = JSON.stringify(newStruc)
  // const bodyB =  new Blob([bodyJson], {
  //     type: 'application/json',
  //     })

  // for (let i = 0; i < content.images.length; i++) {
  //     const image = content.images[i];
  //     formData.append("images", image);
  // }
  content.location.name = '-';
  const response = await axiosInstance.post('/rooms', { ...content });
  return response.data;
};

export const getRoomOffers = async (
  roomId: string
): Promise<ResponseSingle<RoomOffers>> => {
  const response = await axiosInstance.get(`/rooms/${roomId}/offers`);
  return response.data;
};

export const offerRoom = async (
  content: Offer,
  roomId: string
): Promise<ResponseSingle<RoomOffers>> => {
  const response = await axiosInstance.post(`/rooms/${roomId}/offers`, {
    ...content,
  });
  return response.data;
};
