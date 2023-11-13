import axiosInstance from "../../axiosInstance";
import * as API from "../url";

export const getServices = async (page, limit, query) => {
  const response = await axiosInstance.get(
    API.ADMIN_SERVICES +
      `?page=${page}&limit=${limit}&sort=id,DESC&${query || ""}`
  );
  return response.data;
};

export const getAdminServicesList = async (query) => {
  const res = await axiosInstance.get(
    API.ADMIN_SERVICES_LIST(query.filterString, query.limit, query.page)
  );
  return res.data;
};

export const editService = async (data) => {
  const response = await axiosInstance.patch(
    `${API.ADMIN_SERVICES}/${data.id}`,
    data
  );

  return response.data;
};

export const createService = async (data) => {
  const response = await axiosInstance.post(API.CREATE_SERVICE, data);
  return response.data;
};

export const deleteService = async (id) => {
  const response = await axiosInstance.delete(`${API.ADMIN_SERVICES}/${id}`);
  return response.data;
};
