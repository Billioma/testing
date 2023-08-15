import * as API from "../url";
import axiosInstance from "../../axiosInstance";

export const getUserCount = async () => {
  const res = await axiosInstance.get(API.GET_USERS_COUNT);
  return res.data;
};

export const getSubCount = async () => {
  const res = await axiosInstance.get(API.GET_SUB_COUNT);
  return res.data;
};

export const getEventCount = async () => {
  const res = await axiosInstance.get(API.GET_EVENT_COUNT);
  return res.data;
};
