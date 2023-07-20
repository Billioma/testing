import * as API from "../url";
import axiosInstance from "../axiosInstance";

export const getUser = async () => {
  const res = await axiosInstance.get("customer/" + API.GET_USER);
  return res.data;
};
