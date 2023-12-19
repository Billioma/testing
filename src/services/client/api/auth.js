import * as API from "../url";
import axios from "axios";


const BASE_URL = process.env.REACT_APP_BASE_URL;

export const clientLogin = async (body) => {
  const res = await axios.post(BASE_URL + "client/" + API.LOGIN, body);
  return res.data;
};

export const clientResetPassword = async (body) => {
  const res = await axios.post(BASE_URL + "client/" + API.RESET_PASSWORD, body);
  return res.data;
};

export const clientUpdatePassword = async ({ query, body }) => {
  const res = await axios.post(
    BASE_URL + "client/" + API.CHANGE_PASSWORD(query.id, query.hash),
    body
  );
  return res.data;
};
