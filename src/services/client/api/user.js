import * as API from "../url";
import axiosInstance from "../../axiosInstance";

export const getClientDetails = async () => {
  const res = await axiosInstance.get("client/" + API.GET_CLIENT_DETAILS);
  return res.data;
};

export const getCards = async () => {
  const res = await axiosInstance.get(API.GET_CARDS);
  return res.data;
};

export const clientFundWallet = async (body) => {
  const res = await axiosInstance.post("client/" + API.FUND_WALLET, body);
  return res.data;
};
