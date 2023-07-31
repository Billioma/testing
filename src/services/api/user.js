import * as API from "../url";
import axiosInstance from "../axiosInstance";

export const getUser = async () => {
  const res = await axiosInstance.get("customer/" + API.GET_USER);
  return res.data;
};

export const getUserSubscriptions = async () => {
  const res = await axiosInstance.get("customer/" + API.GET_SUBSCRIPTION);
  return res.data;
};

export const getUserSub = async (query) => {
  const res = await axiosInstance.get(
    "customer/" + API.GET_SUBSCRIPTIONS(query.query.page, query.query.limit)
  );
  return res.data;
};

export const customerUpdateUser = async (body) => {
  const res = await axiosInstance.post("customer/" + API.UPDATE_USER, body);
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
  const res = await axiosInstance.post(API.UPLOAD_PIC, body);
  return res.data;
};

export const customerUpdatePassword = async (body) => {
  const res = await axiosInstance.post(
    "customer/" + API.CHANGE_USER_PASSWORD,
    body
  );
  return res.data;
};
