import * as API from "../url";
import axiosInstance from "../../axiosInstance";

export const requestLeave = async (body) => {
  const res = await axiosInstance.post(API.REQUEST_LEAVE, body);
  return res.data;
};

export const getLeave = async (page, limit) => {
  const res = await axiosInstance.get(
    `${API.REQUEST_LEAVE}?page=${page}&limit=${limit}&sort=createdAt,DESC`
  );
  return res.data;
};

export const getLeaveBalance = async () => {
  const res = await axiosInstance.get(API.LEAVE_BALANCE);
  return res.data;
};

export const getLeaveDetails = async (id) => {
  const res = await axiosInstance.get(API.REQUEST_LEAVE + `/${id}`);
  return res.data;
};

export const updateLeave = async ({ query, body }) => {
  const response = await axiosInstance.patch(API.UPDATE_LEAVE(query), body);
  return response.data;
};
