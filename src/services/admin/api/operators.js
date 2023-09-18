import axiosInstance from "../../axiosInstance";
import * as API from "../url";

export const getOperators = async (page, limit) => {
  const response = await axiosInstance.get(
    API.ADMIN_OPERATORS + `?page=${page}&limit=${limit}&sort=id,DESC`
  );
  return response.data;
};
