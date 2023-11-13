import axiosInstance from "../../axiosInstance";
import * as API from "../url";

export const getVehicles = async (page, limit, query) => {
  const response = await axiosInstance.get(
    API.ADMIN_VEHICLES +
      `?page=${page}&limit=${limit}&sort=id,DESC&${query || ""}`
  );
  return response.data;
};

export const getVehiclesList = async (query) => {
  const res = await axiosInstance.get(
    API.ADMIN_VEHICLES_LIST(query.filterString, query.limit, query.page)
  );
  return res.data;
};

export const getAdminVehicle = async (query) => {
  const res = await axiosInstance.get(API.ADMIN_VEHICLE(query.id));
  return res.data;
};

export const updateAdminVehicle = async ({ query, body }) => {
  const res = await axiosInstance.patch(API.ADMIN_VEHICLE(query), body);
  return res.data;
};

export const editVehicle = async (data) => {
  const response = await axiosInstance.patch(
    `${API.ADMIN_VEHICLES}/${data.id}`,
    data
  );

  return response.data;
};

export const deleteVehicle = async (id) => {
  const response = await axiosInstance.delete(`${API.ADMIN_VEHICLES}/${id}`);
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
