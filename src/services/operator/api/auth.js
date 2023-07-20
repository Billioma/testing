import * as API from "../../url";
import axiosInstance from "../../axiosInstance";

export const login = async (body) => {
  const res = await axiosInstance.post("operator/" + API.LOGIN, body);
  return res.data;
};

export const resetPassword = async (body) => {
  const res = await axiosInstance.post("operator/" + API.RESET_PASSWORD, body);
  return res.data;
};

export const updatePassword = async ({ query, body }) => {
  const res = await axiosInstance.post(
    "operator/" + API.CHANGE_PASSWORD(query.id, query.hash),
    body
  );
  return res.data;
};
