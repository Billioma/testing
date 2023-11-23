import * as API from "../url";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const customerLogin = async (body) => {
  const res = await axios.post(BASE_URL + "customer/" + API.LOGIN, body);
  return res.data;
};

export const customerResetPassword = async (body) => {
  const res = await axios.post(
    BASE_URL + "customer/" + API.RESET_PASSWORD,
    body
  );
  return res.data;
};

export const getPublicMakes = async () => {
  const res = await axios.get(BASE_URL + API.PUBLIC_MAKES);
  return res.data;
};

export const getPublicModels = async () => {
  const res = await axios.get(BASE_URL + API.PUBLIC_MODELS);
  return res.data;
};

export const customerRegister = async (body) => {
  const res = await axios.post(BASE_URL + "customer/" + API.REGISTER, body);
  return res.data;
};

export const customerUpdatePassword = async ({ query, body }) => {
  const res = await axios.post(
    BASE_URL + "customer/" + API.CHANGE_PASSWORD(query.id, query.hash),
    body
  );
  return res.data;
};
