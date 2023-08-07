import axiosInstance from "../../axiosInstance";
import * as API from "../url";

export const getDashboardData = async () => {
  const response = await axiosInstance.get(API.GET_ADMIN_DASHBOARD_DATA);
  return response.data.data;
};
