import axiosInstance from "../../axiosInstance";
import { uploadInstance } from "../../axiosInstance";
import * as API from "../url";

export const getDashboardData = async () => {
  const response = await axiosInstance.get(API.GET_ADMIN_DASHBOARD_DATA);
  return response.data.data;
};

export const uploadMedia = async (data) => {
  const res = await uploadInstance.post(API.UPLOAD_MEDIA, data);
  return res.data;
};
