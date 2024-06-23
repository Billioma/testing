import axios from "axios";
import axiosInstance from "../../axiosInstance";
import * as API from "../url";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const login = async (body) => {
  const response = await axios.post(BASE_URL + "admin/" + API.LOGIN, body);
  return response.data;
};

export const updateAdminProfile = async (data) => {
  const response = await axiosInstance.post(API.UPDATE_ADMIN_PROFILE, data);
  return response.data;
};

export const updateAdminPassword = async (data) => {
  const response = await axiosInstance.post(API.UPDATE_ADMIN_PASSWORD, data);
  return response.data;
};

export const getProfile = async () => {
  const response = await axiosInstance.get(API.GET_PROFILE);
  return response.data;
};
