import axiosInstance from "../../axiosInstance";
import * as API from "../url";

export const getRoles = async (page, limit, query) => {
  const response = await axiosInstance.get(
    API.ADMIN_ROLES + `?page=${page}&limit=${limit}&sort=id,DESC&${query || ""}`
  );
  return response.data;
};
