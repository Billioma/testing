import axiosInstance from "../../axiosInstance";
import { uploadInstance } from "../../axiosInstance";
import * as API from "../url";

export const getDashboardData = async () => {
  const response = await axiosInstance.get(API.GET_ADMIN_DASHBOARD_DATA);
  return response.data.data;
};

export const getUsersMetricsFilter = async (query) => {
  const response = await axiosInstance.get(
    API.GET_USERS_METRICS_FILTER(query?.query?.from, query?.query?.to)
  );
  return response.data;
};

export const getServicesMetricsFilter = async (query) => {
  const response = await axiosInstance.get(
    API.GET_SERVICES_METRIC_FILTER(query?.query?.from, query?.query?.to)
  );
  return response.data;
};

export const getActivitiesMetricsFilter = async (query) => {
  const response = await axiosInstance.get(
    API.GET_ACTIVITIES_METRICS_FILTER(query?.query?.from, query?.query?.to)
  );
  return response.data;
};

export const getUsersMetrics = async () => {
  const response = await axiosInstance.get(API.GET_USERS_METRICS);
  return response.data;
};

export const getServicesMetrics = async () => {
  const response = await axiosInstance.get(API.GET_SERVICES_METRICS);
  return response.data;
};

export const getActivitiesMetrics = async () => {
  const response = await axiosInstance.get(API.GET_ACTIVITIES_METRICS);
  return response.data;
};

export const uploadMedia = async (data) => {
  const res = await uploadInstance.post(API.UPLOAD_MEDIA, data);
  return res.data;
};
