import * as API from "../url";
import axiosInstance from "../../axiosInstance";

export const getPaymentHistory = async ({ queryKey }) => {
  const [, limit, page] = queryKey;
  const res = await axiosInstance.get(
    "customer/" + `${API.GET_PAYMENT_HISTORY}?limit=${limit}&page=${page}`
  );
  return res.data;
};

export const getCards = async () => {
  const res = await axiosInstance.get("customer/" + API.GET_CARDS);
  return res.data;
};
