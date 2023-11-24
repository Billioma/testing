import * as API from "../url";
import axiosInstance from "../../axiosInstance";

export const expLoc = async () => {
  const res = await axiosInstance.get(API.EXP_LOC());
  return res.data;
};

export const expZone = async () => {
  const res = await axiosInstance.get(API.EXP_ZONE());
  return res.data;
};

export const expPay = async () => {
  const res = await axiosInstance.get(API.EXP_PAY());
  return res.data;
};

export const expLog = async () => {
  const res = await axiosInstance.get(API.EXP_LOG());
  return res.data;
};
