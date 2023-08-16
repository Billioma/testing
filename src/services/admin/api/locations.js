import axiosInstance from "../../axiosInstance";
import * as API from "../url";

export const getLocations = async (page, limit) => {
  const response = await axiosInstance.get(
    API.GET_LOCATIONS + `?page=${page}&limit=${limit}`
  );
  return response.data;
};
