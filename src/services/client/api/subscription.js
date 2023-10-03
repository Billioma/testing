import * as API from "../url";
import axiosInstance from "../../axiosInstance";

export const getMemPlan = async () => {
  const res = await axiosInstance.get(API.GET_MEM_PLAN);
  return res.data;
};

export const getClientSubs = async (query) => {
  const res = await axiosInstance.get(API.GET_SUBS(query.limit, query.page));
  return res.data;
};

export const createClientSub = async (body) => {
  const res = await axiosInstance.post(API.CREATE_SUB, body);
  return res.data;
};
