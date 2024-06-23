import axiosInstance from "../../axiosInstance";
import * as API from "../url";

export const getDepts = async (page, limit, query) => {
  const response = await axiosInstance.get(
    API.DEPTS +
      `?page=${page}&limit=${limit}&sort=createdAt,DESC&${query || ""}`
  );
  return response.data;
};

export const getDept = async (id) => {
  const res = await axiosInstance.get(API.DEPTS + `/${id}`);
  return res.data;
};

export const getMetrics = async () => {
  const res = await axiosInstance.get(API.GET_ADMIN_DASHBOARD_DATA);
  return res.data;
};

export const addDept = async (data) => {
  const response = await axiosInstance.post(API.DEPTS, data);
  return response.data;
};

export const editDept = async ({ query, body }) => {
  const response = await axiosInstance.patch(API.UPDATE_DEPT(query), body);
  return response.data;
};
