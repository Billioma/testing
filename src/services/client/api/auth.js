import * as API from "../url";
import axiosInstance from "../../axiosInstance";

export const clientLogin = async (body) => {
  const res = await axiosInstance.post("client/" + API.LOGIN, body);
  return res.data;
};

export const clientResetPassword = async (body) => {
  const res = await axiosInstance.post("client/" + API.RESET_PASSWORD, body);
  return res.data;
};

export const clientUpdatePassword = async ({ query, body }) => {
  const res = await axiosInstance.post(
    "client/" + API.CHANGE_PASSWORD(query.id, query.hash),
    body
  );
  return res.data;
};
