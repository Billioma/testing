import axiosInstance from "../../axiosInstance";
import * as API from "../url";

export const getPayToPark = async (page, limit, query) => {
  const response = await axiosInstance.get(
    `${API.ADMIN_PAY_TO_PARK}?page=${page}&limit=${limit}&sort=id,DESC&${
      query || ""
    }`
  );
  return response.data;
};

export const getCarServices = async (page, limit, query) => {
  const response = await axiosInstance.get(
    `${API.ADMIN_CAR_SERVICES}?page=${page}&limit=${limit}&sort=id,DESC&${
      query || ""
    }`
  );
  return response.data;
};

export const deletePayToPark = async (id) => {
  const response = await axiosInstance.delete(`${API.ADMIN_PAY_TO_PARK}/${id}`);
  return response.data;
};

export const getReservedParking = async (page, limit, query) => {
  const response = await axiosInstance.get(
    `${API.ADMIN_RESERVED_PARKING}?page=${page}&limit=${limit}&sort=id,DESC&${
      query || ""
    }`
  );
  return response.data;
};

export const deleteReservedParking = async (id) => {
  const response = await axiosInstance.delete(
    `${API.ADMIN_RESERVED_PARKING}/${id}`
  );
  return response.data;
};

export const editReservedParking = async (data) => {
  const response = await axiosInstance.patch(
    `${API.ADMIN_RESERVED_PARKING}/${data.id}`,
    data
  );

  return response.data;
};

export const addReservedParking = async (data) => {
  const response = await axiosInstance.post(
    `${API.ADMIN_RESERVED_PARKING}`,
    data
  );

  return response.data;
};

export const deleteCarService = async (id) => {
  const response = await axiosInstance.delete(
    `${API.ADMIN_CAR_SERVICES}/${id}`
  );
  return response.data;
};
