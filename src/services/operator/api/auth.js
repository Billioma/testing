import * as API from "../url";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const operatorLogin = async (body) => {
  const res = await axios.post(BASE_URL + "operator/" + API.LOGIN, body);
  return res.data;
};

export const operatorResetPassword = async (body) => {
  const res = await axios.post(
    BASE_URL + "operator/" + API.RESET_PASSWORD,
    body
  );
  return res.data;
};

export const operatorUpdatePassword = async ({ query, body }) => {
  const res = await axios.post(
    BASE_URL + "operator/" + API.CHANGE_PASSWORD(query.id, query.hash),
    body
  );
  return res.data;
};
