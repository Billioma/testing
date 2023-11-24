import * as API from "../url";
import axiosInstance from "../../axiosInstance";

export const getUsers = async (query) => {
  const res = await axiosInstance.get(
    API.GET_USERS(query.filterString, query.limit, query.page)
  );
  return res.data;
};

export const getClientUsers = async () => {
  const res = await axiosInstance.get(API.GET_CLIENT_USERS);
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
