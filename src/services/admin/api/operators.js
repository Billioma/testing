import axiosInstance from "../../axiosInstance";
import * as API from "../url";

export const getOperators = async (page, limit, query) => {
  const response = await axiosInstance.get(
    API.ADMIN_OPERATORS +
      `?page=${page}&limit=${limit}&sort=createdAt,DESC&${query || ""}`
  );
  return response.data;
};
