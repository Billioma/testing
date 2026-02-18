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

export const getUserNoti = async ({ queryKey }) => {
  const [, s] = queryKey;
  const res = await axiosInstance.get(
    `${API.GET_USER_NOTI}${s ? `?filter=title||cont||${s}` : ""}`,
  );
  return res.data;
};

export const checkNoti = async (query) => {
  const res = await axiosInstance.patch(API.CHECK_NOTI(query));
  return res.data;
};

export const updateAtt = async (body) => {
  const res = await axiosInstance.post(API.UPDATE_USER, body);
  return res.data;
};

export const updateAttPass = async (body) => {
  const res = await axiosInstance.post(API.UPDATE_PASS, body);
  return res.data;
};
