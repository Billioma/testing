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

export const getPreference = async () => {
  const res = await axiosInstance.get("customer/" + API.GET_PREFERENCE);
  return res.data;
};

export const getFaq = async () => {
  const res = await axiosInstance.get(API.GET_FAQ);
  return res.data;
};

export const getUserSub = async ({ queryKey }) => {
  const [, limit, page, filters] = queryKey;
  const filterString = filters.join("&");
  const apiUrl = `customer/${API.GET_SUBSCRIPTIONS}?${filterString}&limit=${limit}&page=${page}&sort=id,DESC`;

  const res = await axiosInstance.get(apiUrl);
  return res.data;
};

export const getUserSubs = async (query) => {
  const res = await axiosInstance.get(
    "customer/" + API.GET_SUBS(query.filterString, query.limit, query.page)
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

export const customerUpdatePreference = async (body) => {
  const res = await axiosInstance.patch(
    "customer/" + API.UPDATE_PREFERENCE,
    body
  );
  return res.data;
};

export const customerUpdateUser = async (body) => {
  const res = await axiosInstance.post("customer/" + API.UPDATE_USER, body);
  return res.data;
};

export const adminUpdateUser = async (body) => {
  const res = await axiosInstance.post("admin/" + API.UPDATE_USER, body);
  return res.data;
};

export const sendMail = async (body) => {
  const res = await axiosInstance.post(API.SEND_MAIL, body);
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
