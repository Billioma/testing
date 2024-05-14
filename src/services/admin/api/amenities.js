import axiosInstance from "../../axiosInstance";
import * as API from "../url";

export const getAmenities = async (page, limit, query) => {
  const response = await axiosInstance.get(
    `${API.ADMIN_AMENITIES}?page=${page}&limit=${limit}&sort=createdAt,DESC&${
      query || ""
    }`
  );
  return response.data;
};

export const addAmenity = async (data) => {
  const response = await axiosInstance.post(API.ADMIN_AMENITIES, data);
  return response.data;
};

export const editAmenity = async ({ query, body }) => {
  const response = await axiosInstance.patch(API.ADMIN_AMENITY(query), body);

  return response.data;
};

export const deleteAmenity = async (id) => {
  const response = await axiosInstance.delete(`${API.ADMIN_AMENITIES}/${id}`);
  return response.data;
};
