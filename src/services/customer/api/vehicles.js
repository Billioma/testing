import * as API from "../url";
import axiosInstance from "../../axiosInstance";

export const getVehicles = async () => {
  const res = await axiosInstance.get("customer/" + API.GET_VEHICLES);
  return res.data;
};

export const createVehicles = async (body) => {
  const res = await axiosInstance.post("customer/" + API.GET_VEHICLES, body);
  return res.data;
};

export const updateVehicles = async ({ query, body }) => {
  const res = await axiosInstance.patch(
    "customer/" + API.DEL_VEHICLES(query),
    body
  );
  return res.data;
};

export const claimVehicles = async (query) => {
  const res = await axiosInstance.get("customer/" + API.CLAIM_VEHICLES(query));
  return res.data;
};

export const deleteVehicles = async (query) => {
  const res = await axiosInstance.delete("customer/" + API.DEL_VEHICLES(query));
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
