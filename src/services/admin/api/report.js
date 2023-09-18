import * as API from "../url";
import axiosInstance from "../../axiosInstance";

export const getAdminReport = async (query) => {
  const res = await axiosInstance.get(
    API.GET_ADMIN_REPORTS(query.type, query.limit, query.page)
  );
  return res.data;
};

export const getAdminTran = async (query) => {
  const res = await axiosInstance.get(
    API.GET_ADMIN_TRAN(query.limit, query.page)
  );
  return res.data;
};
