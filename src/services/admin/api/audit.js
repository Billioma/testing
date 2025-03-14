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

export const getSalesReportsLocationGrid = async (
  id,
  managerId,
  page,
  limit,
  startDate,
  endDate
) => {
  const response = await axiosInstance.get(
    `${API.GET_SALES_REPORT_LOCATION_GRID}/${id}?managerId=${managerId}&page=${page}&limit=${limit}&startDate=${startDate}&endDate=${endDate}`
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
