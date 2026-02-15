import * as API from "../url";
import axiosInstance from "../../axiosInstance";

export const getUser = async () => {
  const res = await axiosInstance.get("attendant/" + API.GET_USER);
  return res.data;
};

export const getUserZones = async ({ queryKey }) => {
  const [, id] = queryKey;
  const res = await axiosInstance.get(`${API.GET_USER_ZONES}/${id}`);
  return res.data;
};
