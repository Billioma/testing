import * as API from "../url";
import axiosInstance from "../../axiosInstance";

export const getSchedule = async () => {
  const res = await axiosInstance.get(API.SCHEDULE);
  return res.data;
};
