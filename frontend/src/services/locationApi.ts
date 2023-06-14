import { ResponseMulti, Location } from "../models";
import axiosInstance from "./base";


export const getAll = async (): Promise<ResponseMulti<Location>> => {
    const response = await axiosInstance.get('/locations');
    return response.data;
}