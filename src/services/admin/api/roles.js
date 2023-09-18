import axiosInstance from "../../axiosInstance";
import * as API from "../url";

export const getRoles = async (page, limit) => {
  const response = await axiosInstance.get(
    API.ADMIN_ROLES + `?page=${page}&limit=${limit}&sort=id,DESC`
  );
  return response.data;
};
