import * as API from "../url";
import axiosInstance from "../../axiosInstance";

export const getRepLocations = async (query) => {
  const res = await axiosInstance.get(
    API.GET_REP_LOCATION(query.limit, query.page)
  );
  return res.data;
};

export const getRepZones = async (query) => {
  const res = await axiosInstance.get(
    API.GET_REP_ZONE(query.limit, query.page)
  );
  return res.data;
};

export const getRepPayments = async (query) => {
  const res = await axiosInstance.get(
    API.GET_REP_PAYMENT(query.limit, query.page)
  );
  return res.data;
};

export const getRepLogs = async (query) => {
  const res = await axiosInstance.get(
    API.GET_REP_LOGS(query.limit, query.page)
  );
  return res.data;
};
