import axiosInstance from "../../axiosInstance";
import * as API from "../url";

export const getAttendants = async (page, limit) => {
  const response = await axiosInstance.get(
    API.GET_ATTENDANTS + `?page=${page}&limit=${limit}`
  );
  return response.data;
};

export const getCustomers = async (page, limit) => {
  const response = await axiosInstance.get(
    API.GET_CUSTOMERS + `?page=${page}&limit=${limit}`
  );
  return response.data;
};
