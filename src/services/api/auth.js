import axios from "axios";
import * as API from "../url";
import axiosInstance from "../axiosInstance";

export const login = async (body) => {
  const res = await axios.post(API.LOGIN, body);
  return res.data;
};

export const sendPassOtp = async (body) => {
  const res = await axios.post(API.SEND_PASS_OTP, body);
  return res.data;
};

export const verifyPassOtp = async (body) => {
  const res = await axios.post(API.VRIFY_PASS__OTP, body);
  return res.data;
};

export const updatePassword = async (body) => {
  const res = await axiosInstance.post(API.UPDATE_PASS, body);
  return res.data;
};
