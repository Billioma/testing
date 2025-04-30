import axiosInstance from "../../axiosInstance";
import * as API from "../url";

export const getSalesReports = async (page, limit, query) => {
  const response = await axiosInstance.get(
    `${API.GET_SALES_REPORT}?page=${page}&limit=${limit}&sort=createdAt,DESC&${
      query || ""
    }`
  );
  return response.data;
};

export const getManagerSalesReports = async (
  search,
  page,
  limit,
  startDate,
  endDate
) => {
  const response = await axiosInstance.get(
    `${API.GET_MANAGER_SALES_REPORT}?search=${search}&page=${page}&limit=${limit}&startDate=${startDate}&endDate=${endDate}&sort=createdAt,DESC`
  );
  return response.data;
};

export const getManagerGrid = async (
  managerId,
  page,
  limit,
  startDate,
  endDate
) => {
  const response = await axiosInstance.get(
    `${API.GET_MANAGER_GRID}?managerId=${managerId}&page=${page}&limit=${limit}&startDate=${startDate}&endDate=${endDate}`
  );
  return response.data;
};

export const getSalesReportsLocationTrans = async (
  id,
  managerId,
  page,
  limit,
  startDate,
  endDate
) => {
  const response = await axiosInstance.get(
    `${API.GET_SALES_REPORT_LOCATION_TRANSACTION}/${id}?managerId=${managerId}&page=${page}&limit=${limit}&startDate=${startDate}&endDate=${endDate}`
  );
  return response.data;
};

export const deleteSalesReport = async (id) => {
  const response = await axiosInstance.delete(`${API.GET_SALES_REPORT}/${id}`);
  return response.data;
};
