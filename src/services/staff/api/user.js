import * as API from "../url";
import axiosInstance, { uploadInstance } from "../../axiosInstance";

export const getUser = async () => {
  const res = await axiosInstance.get(API.GET_USER);
  return res.data;
};

export const uploadPic = async (body) => {
  const res = await uploadInstance.post(API.UPLOAD_PIC, body);
  return res.data;
};
