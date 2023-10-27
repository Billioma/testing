import axiosInstance from "../../axiosInstance";
import * as API from "../url";

export const getLocations = async (page, limit, query) => {
  const response = await axiosInstance.get(
    API.ADMIN_LOCATIONS +
      `?page=${page}&limit=${limit}&sort=id,DESC&${query || ""}`
  );
  return response.data;
};

export const getZones = async (page, limit, query) => {
  const response = await axiosInstance.get(
    API.ADMIN_ZONES + `?page=${page}&limit=${limit}&sort=id,DESC&${query || ""}`
  );
  return response.data;
};

export const getRates = async (page, limit, query) => {
  const response = await axiosInstance.get(
    API.ADMIN_RATES + `?page=${page}&limit=${limit}&sort=id,DESC&${query || ""}`
  );
  return response.data;
};

export const addLocation = async (data) => {
  const response = await axiosInstance.post(API.ADMIN_LOCATIONS, data);
  return response.data;
};

export const addZone = async (data) => {
  const response = await axiosInstance.post(API.ADMIN_ZONES, data);
  return response.data;
};

export const editLocation = async (data) => {
  const response = await axiosInstance.patch(
    `${API.ADMIN_LOCATIONS}/${data.id}`,
    data
  );

  return response.data;
};

export const addRate = async (data) => {
  const response = await axiosInstance.post(API.ADMIN_RATES, data);
  return response.data;
};

export const editRate = async (data) => {
  const response = await axiosInstance.patch(
    `${API.ADMIN_RATES}/${data.id}`,
    data
  );

  return response.data;
};

export const editZone = async (data) => {
  const response = await axiosInstance.patch(
    `${API.ADMIN_ZONES}/${data.id}`,
    data
  );

  return response.data;
};

export const deleteLocation = async (id) => {
  const response = await axiosInstance.delete(`${API.ADMIN_LOCATIONS}/${id}`);
  return response.data;
};

export const deleteZone = async (id) => {
  const response = await axiosInstance.delete(`${API.ADMIN_ZONES}/${id}`);
  return response.data;
};

export const deleteRate = async (id) => {
  const response = await axiosInstance.delete(`${API.ADMIN_RATES}/${id}`);
  return response.data;
};

export const deletePolicy = async (id) => {
  const response = await axiosInstance.delete(`${API.ADMIN_POLICIES}/${id}`);
  return response.data;
};

export const addPolicy = async (data) => {
  const response = await axiosInstance.post(API.ADMIN_POLICIES, data);
  return response.data;
};

export const editPolicy = async (data) => {
  const response = await axiosInstance.patch(
    `${API.ADMIN_POLICIES}/${data.id}`,
    data
  );

  return response.data;
};

export const getPolicies = async (page, limit, query) => {
  const response = await axiosInstance.get(
    API.ADMIN_POLICIES +
      `?page=${page}&limit=${limit}&sort=id,DESC&${query || ""}`
  );
  return response.data;
};
