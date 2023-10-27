import axiosInstance from "../../axiosInstance";
import * as API from "../url";

export const getValetedVehicles = async (page, limit, query) => {
  const response = await axiosInstance.get(
    `${API.ADMIN_SERVICE_LOGS}?page=${page}&limit=${limit}&sort=id,DESC&filter=service.serviceType||$eq||VALET`
  );
  return response.data;
};

export const editValetedVehicle = async (data) => {
  const response = await axiosInstance.patch(
    `${API.ADMIN_SERVICE_LOGS}/${data.id}`,
    data
  );

  return response.data;
};

export const deleteValetedVehicle = async (id) => {
  const response = await axiosInstance.delete(
    `${API.ADMIN_SERVICE_LOGS}/${id}`
  );
  return response.data;
};

export const getParkedVehicles = async (page, limit, query) => {
  const response = await axiosInstance.get(
    `${API.ADMIN_SERVICE_LOGS}?page=${page}&limit=${limit}&sort=id,DESC&filter=service.serviceType||$eq||PARKING`
  );
  return response.data;
};

export const editParkedVehicle = async (data) => {
  const response = await axiosInstance.patch(
    `${API.ADMIN_SERVICE_LOGS}/${data.id}`,
    data
  );

  return response.data;
};

export const deleteParkedVehicle = async (id) => {
  const response = await axiosInstance.delete(
    `${API.ADMIN_SERVICE_LOGS}/${id}`
  );
  return response.data;
};

export const getServicedVehicles = async (page, limit, query) => {
  const response = await axiosInstance.get(
    `${API.ADMIN_SERVICE_LOGS}?page=${page}&limit=${limit}&sort=id,DESC&filter=service.serviceType||$eq||SERVICE`
  );
  return response.data;
};

export const editServicedVehicle = async (data) => {
  const response = await axiosInstance.patch(
    `${API.ADMIN_SERVICE_LOGS}/${data.id}`,
    data
  );

  return response.data;
};

export const deleteServicedVehicle = async (id) => {
  const response = await axiosInstance.delete(
    `${API.ADMIN_SERVICE_LOGS}/${id}`
  );
  return response.data;
};
