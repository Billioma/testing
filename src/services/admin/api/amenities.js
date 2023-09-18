import axiosInstance from "../../axiosInstance";
import * as API from "../url";

export const getAmenities = async (page, limit) => {
  const response = await axiosInstance.get(
    `${API.ADMIN_AMENITIES}?page=${page}&limit=${limit}&sort=id,DESC`
  );
  return response.data;
};
