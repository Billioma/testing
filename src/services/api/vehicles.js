import * as API from "../url";
import axiosInstance from "../axiosInstance";

export const getVehicles = async () => {
  const res = await axiosInstance.get("customer/" + API.GET_VEHICLES);
  return res.data;
};

export const createVehicles = async (body) => {
  const res = await axiosInstance.post("customer/" + API.GET_VEHICLES, body);
  return res.data;
};

export const getMakes = async () => {
  const res = await axiosInstance.get("customer/" + API.GET_MAKE);
  return res.data;
};

export const getModel = async () => {
  const res = await axiosInstance.get("customer/" + API.GET_MODEL);
  return res.data;
};
