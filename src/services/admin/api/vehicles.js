import axiosInstance from "../../axiosInstance";
import * as API from "../url";

export const getVehicles = async (page, limit) => {
  const response = await axiosInstance.get(
    API.ADMIN_VEHICLES + `?page=${page}&limit=${limit}`
  );
  return response.data;
};

export const editVehicle = async (data) => {
  const response = await axiosInstance.patch(
    `${API.ADMIN_VEHICLES}/${data.id}`,
    data
  );

  return response.data;
};

export const createVehicle = async (data) => {
  const response = await axiosInstance.post(API.ADMIN_VEHICLES, data);
  return response.data;
};

export const getMakes = async () => {
  const res = await axiosInstance.get(API.ADMIN_VEHICLE_MAKES);
  return res.data;
};

export const getModel = async () => {
  const res = await axiosInstance.get(API.ADMIN_VEHICLE_MODELS);
  return res.data;
};
