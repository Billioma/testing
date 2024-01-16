import * as API from "../url";
import axiosInstance from "../../axiosInstance";

export const getClientParkedLogs = async (page, limit, query) => {
  const response = await axiosInstance.get(
    `${
      API.CLIENT_SERVICE_LOGS
    }?page=${page}&limit=${limit}&sort=createdAt,DESC&&filter=service.serviceType||$eq||PARKING&${
      query || ""
    }`
  );
  return response.data;
};

export const getClientValetedLogs = async (page, limit, query) => {
  const response = await axiosInstance.get(
    `${
      API.CLIENT_SERVICE_LOGS
    }?page=${page}&limit=${limit}&sort=createdAt,DESC&&filter=service.serviceType||$eq||VALET&${
      query || ""
    }`
  );
  return response.data;
};

export const getClientServiceLog = async (query) => {
  const res = await axiosInstance.get(API.CLIENT_SERVICE_LOGS_DETAIL(query.id));
  return res.data;
};

export const getClientServiceLogs = async (page, limit, query) => {
  const response = await axiosInstance.get(
    `${
      API.CLIENT_SERVICE_LOGS
    }?page=${page}&limit=${limit}&sort=createdAt,DESC&&filter=service.serviceType||$eq||SERVICE&${
      query || ""
    }`
  );
  return response.data;
};
