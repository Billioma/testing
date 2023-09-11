import * as API from "../url";
import axiosInstance from "../../axiosInstance";

export const getOperatorProfile = async () => {
  const res = await axiosInstance.get(API.OPERATOR_PROFILE);
  return res.data;
};

export const getOperatorLocation = async () => {
  const res = await axiosInstance.get(API.GET_LOCATION);
  return res.data;
};
