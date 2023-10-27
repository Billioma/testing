import axiosInstance from "../../axiosInstance";
import * as API from "../url";

export const getRoles = async (page, limit, query) => {
  const response = await axiosInstance.get(
    `${API.ADMIN_ROLES}?page=${page}&limit=${limit}&sort=id,DESC&${query || ""}`
  );
  return response.data;
};

export const editRole = async (data) => {
  const response = await axiosInstance.patch(
    `${API.ADMIN_ROLES}/${data.id}`,
    data
  );

  return response.data;
};

export const addRole = async (data) => {
  const response = await axiosInstance.post(`${API.ADMIN_ROLES}`, data);
  return response.data;
};

export const deleteRole = async (id) => {
  const response = await axiosInstance.delete(`${API.ADMIN_ROLES}/${id}`);
  return response.data;
};

export const addModel = async (data) => {
  const response = await axiosInstance.post(
    `${API.ADMIN_VEHICLE_MODELS}`,
    data
  );
  return response.data;
};

export const getModels = async (page, limit, query) => {
  const response = await axiosInstance.get(
    `${API.ADMIN_VEHICLE_MODELS}?page=${page}&limit=${limit}&sort=id,DESC&${
      query || ""
    }`
  );
  return response.data;
};

export const editModel = async (data) => {
  const response = await axiosInstance.patch(
    `${API.ADMIN_VEHICLE_MODELS}/${data.id}`,
    data
  );

  return response.data;
};

export const deleteModel = async (id) => {
  const response = await axiosInstance.delete(
    `${API.ADMIN_VEHICLE_MODELS}/${id}`
  );
  return response.data;
};

export const addMake = async (data) => {
  const response = await axiosInstance.post(`${API.ADMIN_VEHICLE_MAKES}`, data);
  return response.data;
};

export const getMakes = async (page, limit, query) => {
  const response = await axiosInstance.get(
    `${API.ADMIN_VEHICLE_MAKES}?page=${page}&limit=${limit}&sort=id,DESC&${
      query || ""
    }`
  );
  return response.data;
};

export const editMake = async (data) => {
  const response = await axiosInstance.patch(
    `${API.ADMIN_VEHICLE_MAKES}/${data.id}`,
    data
  );

  return response.data;
};

export const deleteMake = async (id) => {
  const response = await axiosInstance.delete(
    `${API.ADMIN_VEHICLE_MAKES}/${id}`
  );
  return response.data;
};

export const addBankDetail = async (data) => {
  const response = await axiosInstance.post(`${API.ADMIN_BANK_DETAILS}`, data);
  return response.data;
};

export const getBankDetails = async (page, limit, query) => {
  const response = await axiosInstance.get(
    `${API.ADMIN_BANK_DETAILS}?page=${page}&limit=${limit}&sort=id,DESC&${
      query || ""
    }`
  );
  return response.data;
};

export const editBankDetail = async (data) => {
  const response = await axiosInstance.patch(
    `${API.ADMIN_BANK_DETAILS}/${data.id}`,
    data
  );

  return response.data;
};

export const deleteBankDetail = async (id) => {
  const response = await axiosInstance.delete(
    `${API.ADMIN_BANK_DETAILS}/${id}`
  );
  return response.data;
};

export const addFaq = async (data) => {
  const response = await axiosInstance.post(`${API.ADMIN_FAQS}`, data);
  return response.data;
};

export const getFaqs = async (page, limit, query) => {
  const response = await axiosInstance.get(
    `${API.ADMIN_FAQS}?page=${page}&limit=${limit}&sort=id,DESC&${query || ""}`
  );
  return response.data;
};

export const editFaq = async (data) => {
  const response = await axiosInstance.patch(
    `${API.ADMIN_FAQS}/${data.id}`,
    data
  );

  return response.data;
};

export const deleteFaq = async (id) => {
  const response = await axiosInstance.delete(`${API.ADMIN_FAQS}/${id}`);
  return response.data;
};
