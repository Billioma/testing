import * as API from "../url";
import axiosInstance from "../../axiosInstance";

export const getPaymentHistory = async (query) => {
  const res = await axiosInstance.get(
    "customer/" +
      API.GET_PAYMENT_HISTORY(query.filterString, query.limit, query.page)
  );
  return res.data;
};

export const getPaymentTips= async (query) => {
  const res = await axiosInstance.get(
    "customers/" +
      API.GET_PAYMENT_TIPS(query.filterString, query.limit, query.page)
  );
  return res.data;
};

export const getCards = async () => {
  const res = await axiosInstance.get("customer/" + API.GET_CARDS);
  return res.data;
};
