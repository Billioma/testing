import axiosInstance from "../../axiosInstance";
import * as API from "../url";

export const getAttendants = async (page, limit) => {
  const response = await axiosInstance.get(
    API.ADMIN_ATTENDANTS + `?page=${page}&limit=${limit}`
  );
  return response.data;
};

export const getCustomers = async (page, limit) => {
  const response = await axiosInstance.get(
    API.ADMIN_CUSTOMERS + `?page=${page}&limit=${limit}`
  );
  return response.data;
};

export const getOperators = async (page, limit) => {
  const response = await axiosInstance.get(
    API.ADMIN_OPERATORS + `?page=${page}&limit=${limit}`
  );
  return response.data;
};

export const getAdministrators = async (page, limit) => {
  const response = await axiosInstance.get(
    API.ADMIN_ADMINISTRATORS + `?page=${page}&limit=${limit}`
  );
  return response.data;
};

export const createAdministrator = async (data) => {
  const response = await axiosInstance.post(API.ADMIN_ADMINISTRATORS, data);
  return response.data;
};

export const createOperator = async (data) => {
  const response = await axiosInstance.post(API.ADMIN_OPERATORS, data);
  return response.data;
};

export const createAttendant = async (data) => {
  const response = await axiosInstance.post(API.ADMIN_ATTENDANTS, data);
  return response.data;
};

export const editCustomer = async (data) => {
  const response = await axiosInstance.patch(
    `${API.ADMIN_CUSTOMERS}/${data.id}`,
    data
  );
  return response.data;
};

export const editAdministrator = async (data) => {
  const response = await axiosInstance.patch(
    `${API.ADMIN_ADMINISTRATORS}/${data.id}`,
    data
  );
  return response.data;
};

export const editOperator = async (data) => {
  const response = await axiosInstance.patch(
    `${API.ADMIN_OPERATORS}/${data.id}`,
    data
  );
  return response.data;
};

export const editAttendant = async (data) => {
  const response = await axiosInstance.patch(
    `${API.ADMIN_ATTENDANTS}/${data.id}`,
    data
  );
  return response.data;
};

export const deleteAttendant = async (id) => {
  const response = await axiosInstance.delete(`${API.ADMIN_ATTENDANTS}/${id}`);
  return response;
};

export const deleteAdministrator = async (id) => {
  const response = await axiosInstance.delete(
    `${API.ADMIN_ADMINISTRATORS}/${id}`
  );
  return response;
};

export const deleteOperator = async (id) => {
  const response = await axiosInstance.delete(`${API.ADMIN_OPERATORS}/${id}`);
  return response;
};

export const deleteCustomer = async (id) => {
  const response = await axiosInstance.delete(`${API.ADMIN_CUSTOMERS}/${id}`);
  return response;
};

export const createCustomer = async (data) => {
  const response = await axiosInstance.post(API.ADMIN_CUSTOMERS, data);
  return response.data;
};
