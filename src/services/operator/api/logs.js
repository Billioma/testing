import * as API from "../url";
import axiosInstance from "../../axiosInstance";

export const getValeted = async (query) => {
  const res = await axiosInstance.get(API.GET_VALETED(query.limit, query.page));
  return res.data;
};

export const getParked = async (query) => {
  const res = await axiosInstance.get(API.GET_PARKED(query.limit, query.page));
  return res.data;
};

export const getServiced = async (query) => {
  const res = await axiosInstance.get(
    API.GET_SERVICED(query.filterString, query.limit, query.page)
  );
  return res.data;
};

export const getLog = async (query) => {
  const res = await axiosInstance.get(API.GET_LOG(query.id));
  return res.data;
};
