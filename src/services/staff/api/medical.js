import * as API from "../url";
import axiosInstance from "../../axiosInstance";

export const requestMed = async (body) => {
  const res = await axiosInstance.post(API.REQUEST_MED, body);
  return res.data;
};

export const getMed = async (page, limit) => {
  const res = await axiosInstance.get(
    `${API.REQUEST_MED}?page=${page}&limit=${limit}&sort=createdAt,DESC`,
  );
  return res.data;
};

export const getMedDetails = async (id) => {
  const res = await axiosInstance.get(API.REQUEST_MED + `/${id}`);
  return res.data;
};

export const updateMed = async ({ query, body }) => {
  const response = await axiosInstance.patch(API.UPDATE_MED(query), body);
  return response.data;
};

export const withdrawMed = async (query) => {
  const response = await axiosInstance.patch(API.WITHDRAW_MED(query));
  return response.data;
};
