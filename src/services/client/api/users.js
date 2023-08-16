import * as API from "../url";
import axiosInstance from "../../axiosInstance";

export const getUsers = async () => {
  const res = await axiosInstance.get(API.GET_USERS());
  return res.data;
};

export const lookupUser = async (query) => {
  const res = await axiosInstance.get(API.LOOKUP_USER(query));
  return res.data;
};

export const attachUser = async (query) => {
  const res = await axiosInstance.get(API.ATTACH_USER(query));
  return res.data;
};

export const detachUser = async (query) => {
  const res = await axiosInstance.get(API.DETACH_USER(query));
  return res.data;
};
