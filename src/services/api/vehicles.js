import * as API from "../url";
import axiosInstance from "../axiosInstance";

export const getVehicles = async () => {
  const res = await axiosInstance.get("customer/" + API.GET_VEHICLES);
  return res.data;
};
