import * as API from "../url";
import axiosInstance from "../axiosInstance";

export const getPaymentHistory = async (query) => {
  const res = await axiosInstance.get(
    "customer/" + API.GET_PAYMENT_HISTORY(query.query.page, query.query.limit)
  );
  return res.data;
};
