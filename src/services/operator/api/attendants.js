import * as API from "../url";
import axiosInstance from "../../axiosInstance";

export const getAttendants = async (query) => {
  const res = await axiosInstance.get(
    API.GET_ATTENDANTS(query.filterString, query.limit, query.page)
  );
  return res.data;
};

export const deleteAttendant = async (query) => {
  const res = await axiosInstance.delete(API.UPDATE_ATTENDANT(query));
  return res.data;
};

export const getAttendant = async (query) => {
  const res = await axiosInstance.get(API.UPDATE_ATTENDANT(query.id));
  return res.data;
};

export const createAttendant = async (body) => {
  const res = await axiosInstance.post(API.CREATE_ATTENDANT, body);
  return res.data;
};

export const updateAttendants = async ({ query, body }) => {
  const res = await axiosInstance.patch(API.UPDATE_ATTENDANT(query), body);
  return res.data;
};
