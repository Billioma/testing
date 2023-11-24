import axiosInstance from "../../axiosInstance";
import * as API from "../url";

export const getOpPtp = async (page, limit, query) => {
  const response = await axiosInstance.get(
    `${API.OP_PTP}?page=${page}&limit=${limit}&sort=id,DESC&${query || ""}`
  );
  return response.data;
};

export const getOpRp = async (page, limit, query) => {
  const response = await axiosInstance.get(
    `${API.OP_RP}?page=${page}&limit=${limit}&sort=id,DESC&${query || ""}`
  );
  return response.data;
};

export const getOpEv = async (page, limit, query) => {
  const response = await axiosInstance.get(
    `${API.OP_EV}?page=${page}&limit=${limit}&sort=id,DESC&${query || ""}`
  );
  return response.data;
};

export const getOpService = async (page, limit, query) => {
  const response = await axiosInstance.get(
    `${API.OP_SERVICE}?page=${page}&limit=${limit}&sort=id,DESC&${query || ""}`
  );
  return response.data;
};

export const cancelOpRp = async (query) => {
  const res = await axiosInstance.get(API.CANCEL_OP_RP(query));
  return res.data;
};

export const cancelOpEv = async (query) => {
  const res = await axiosInstance.get(API.CANCEL_OP_EV(query));
  return res.data;
};

export const cancelOpService = async (query) => {
  const res = await axiosInstance.get(API.CANCEL_OP_SERVICE(query));
  return res.data;
};

export const getOpPtpDetails = async (query) => {
  const res = await axiosInstance.get(API.OP_PTP_DETAILS(query.id));
  return res.data;
};

export const getOpRpDetails = async (query) => {
  const res = await axiosInstance.get(API.OP_RP_DETAILS(query.id));
  return res.data;
};

export const getOpEvDetails = async (query) => {
  const res = await axiosInstance.get(API.OP_EV_DETAILS(query.id));
  return res.data;
};

export const getOpServicesDetails = async (query) => {
  const res = await axiosInstance.get(API.OP_SERVICE_DETAILS(query.id));
  return res.data;
};
