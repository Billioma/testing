import axiosInstance from "../../axiosInstance";
import * as API from "../url";

export const getCustomerServiceLogs = async (type, page, limit) => {
  const response = await axiosInstance.get(
    `${API.CUSTOMER_SERVICE_LOGS}?filter=service.serviceType||$cont||${type}&page=${page}&limit=${limit}`
  );
  return response.data;
};

export const getCustomerParkingLogs = async (type, page, limit) => {
  const response = await axiosInstance.get(
    `${API.CUSTOMER_SERVICE_LOGS}?filter=service.serviceType||$cont||${type}&filter=ticketNumber||$cont||PTP&page=${page}&limit=${limit}`
  );
  return response.data;
};
