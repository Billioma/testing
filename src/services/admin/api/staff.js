import axiosInstance from "../../axiosInstance";
import * as API from "../url";

export const addStaff = async (data) => {
  const response = await axiosInstance.post(API.STAFFS, data);
  return response.data;
};

export const addStaffDoc = async (data) => {
  const response = await axiosInstance.post(API.EMPLOYEE_DOC, data);
  return response.data;
};

export const getStaffs = async (page, limit, query) => {
  const response = await axiosInstance.get(
    API.STAFFS +
      `?page=${page}&limit=${limit}&sort=createdAt,DESC&${query || ""}`
  );
  return response.data;
};

export const editStaff = async ({ query, body }) => {
  const response = await axiosInstance.patch(API.STAFF(query), body);
  return response.data;
};

export const editEmployeeDoc = async ({ query, body }) => {
  const response = await axiosInstance.patch(
    API.UPDATE_EMPLOYEE_DOC(query),
    body
  );
  return response.data;
};

export const deleteStaff = async (id) => {
  const response = await axiosInstance.delete(`${API.STAFFS}/${id}`);
  return response.data;
};

export const delEmployeeDoc = async (query) => {
  const response = await axiosInstance.delete(API.UPDATE_EMPLOYEE_DOC(query));
  return response.data;
};

export const getStaff = async (id) => {
  const res = await axiosInstance.get(API.STAFFS + `/${id}`);
  return res.data;
};
