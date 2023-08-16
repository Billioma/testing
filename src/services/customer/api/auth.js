import * as API from "../url";
import axiosInstance from "../../axiosInstance";

export const customerLogin = async (body) => {
  const res = await axiosInstance.post("customer/" + API.LOGIN, body);
  return res.data;
};

export const customerResetPassword = async (body) => {
  const res = await axiosInstance.post("customer/" + API.RESET_PASSWORD, body);
  return res.data;
};

export const customerRegister = async (body) => {
  const res = await axiosInstance.post("customer/" + API.REGISTER, body);
  return res.data;
};

export const customerUpdatePassword = async ({ query, body }) => {
  const res = await axiosInstance.post(
    "customer/" + API.CHANGE_PASSWORD(query.id, query.hash),
    body
  );
  return res.data;
};
