import { ResponseMulti, Location, ResponseSingle } from "../models";
import axiosInstance from "./base";


export const getAll = async (): Promise<ResponseMulti<Location>> => {
    const response = await axiosInstance.get('/locations');
    return response.data;
}

export const getSingle = async (id: string): Promise<ResponseSingle<Location>> => {
    const response = await axiosInstance.get(`/location/${id}`);
    return response.data;
}