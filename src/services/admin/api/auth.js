import axios from "axios";
import axiosInstance from "../../axiosInstance";
import * as API from "../url";

export const login = async (data) => {
  const response = await axios.post(API.LOGIN, data);
  return response.data;
};

export const getProfile = async () => {
  const response = await axiosInstance.get(API.GET_PROFILE);
  return response.data;
};
