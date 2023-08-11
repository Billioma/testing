import * as API from "../url";
import axiosInstance from "../../axiosInstance";

export const operatorLogin = async (body) => {
  const res = await axiosInstance.post("operator/" + API.LOGIN, body);
  return res.data;
};

export const operatorResetPassword = async (body) => {
  const res = await axiosInstance.post("operator/" + API.RESET_PASSWORD, body);
  return res.data;
};

export const operatorUpdatePassword = async ({ query, body }) => {
  const res = await axiosInstance.post(
    "operator/" + API.CHANGE_PASSWORD(query.id, query.hash),
    body
  );
  return res.data;
};
