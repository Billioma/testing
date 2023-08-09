import * as API from "../url";
import axiosInstance, { uploadInstance } from "../../axiosInstance";

export const getUser = async () => {
  const res = await axiosInstance.get("customer/" + API.GET_USER);
  return res.data;
};

export const getUserSubscriptions = async () => {
  const res = await axiosInstance.get("customer/" + API.GET_SUBSCRIPTION);
  return res.data;
};

export const getUserSub = async ({ queryKey }) => {
  const [, limit, page] = queryKey;
  const res = await axiosInstance.get(
    "customer/" + `${API.GET_SUBSCRIPTIONS}?limit=${limit}&page=${page}`
  );
  return res.data;
};

export const cancelSub = async (query) => {
  const res = await axiosInstance.get(
    "customer/" + API.CANCEL_SUBSCRIPTIONS(query)
  );
  return res.data;
};

export const renewSub = async ({ query, body }) => {
  const res = await axiosInstance.post(
    "customer/" + API.RENEW_SUBSCRIPTIONS(query),
    body
  );
  return res.data;
};

export const deleteCard = async (query) => {
  const res = await axiosInstance.delete("customer/" + API.DEL_CARDS(query));
  return res.data;
};

export const customerUpdateUser = async (body) => {
  const res = await axiosInstance.post("customer/" + API.UPDATE_USER, body);
  return res.data;
};

export const customerFundWallet = async (body) => {
  const res = await axiosInstance.post("customer/" + API.FUND_WALLET, body);
  return res.data;
};

export const customerCreateSubscription = async (body) => {
  const res = await axiosInstance.post(
    "customer/" + API.GET_SUBSCRIPTION,
    body
  );
  return res.data;
};

export const customerUploadPic = async (body) => {
  const res = await uploadInstance.post(API.UPLOAD_PIC, body);
  return res.data;
};

export const customerUpdatePassword = async (body) => {
  const res = await axiosInstance.post(
    "customer/" + API.CHANGE_USER_PASSWORD,
    body
  );
  return res.data;
};
