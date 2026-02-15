import * as API from "../url";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const attendantLogin = async (body) => {
  const res = await axios.post(BASE_URL + "attendant/" + API.LOGIN, body);
  return res.data;
};
