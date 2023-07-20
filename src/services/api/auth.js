import * as API from "../url";
import axiosInstance from "../axiosInstance";

export const login = async (body) => {
  const res = await axiosInstance.post("customer/" + API.LOGIN, body);
  return res.data;
};

export const resetPassword = async (body) => {
  const res = await axiosInstance.post("customer/" + API.RESET_PASSWORD, body);
  return res.data;
};

export const register = async (body) => {
  const res = await axiosInstance.post("customer/" + API.REGISTER, body);
  return res.data;
};

export const updatePassword = async ({ query, body }) => {
  const res = await axiosInstance.post(
    "customer/" + API.CHANGE_PASSWORD(query.id, query.hash),
    body
  );
  return res.data;
};
