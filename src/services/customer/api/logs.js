import axiosInstance from "../../axiosInstance";
import * as API from "../url";

export const getCustomerServiceLogs = async () => {
  const res = await axiosInstance.get(
    API.CUSTOMER_SERVICE_LOGS_LIST(query.limit, query.page)
  );
  return res.data;
};
