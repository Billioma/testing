import * as API from "../url";
import axiosInstance from "../../axiosInstance";

export const getRepLocations = async (query) => {
  const res = await axiosInstance.get(
    API.GET_REP_LOCATION(query.filterString, query.limit, query.page)
  );
  return res.data;
};

export const getOpRepUrl = async (type, page, limit, query) => {
  const response = await axiosInstance.get(
    "operator/reports/" +
      `${type}?page=${page}&limit=${limit}&sort=createdAt,DESC&${query || ""}`
  );
  return response.data;
};

export const getRepZones = async (query) => {
  const res = await axiosInstance.get(
    API.GET_REP_ZONE(query.filterString, query.limit, query.page)
  );
  return res.data;
};

export const getRepPayments = async (query) => {
  const res = await axiosInstance.get(
    API.GET_REP_PAYMENT(query.filterString, query.limit, query.page)
  );
  return res.data;
};

export const getRepLogs = async (query) => {
  const res = await axiosInstance.get(
    API.GET_REP_LOGS(query.filterString, query.limit, query.page)
  );
  return res.data;
};
