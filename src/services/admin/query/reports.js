import { useMutation } from "react-query";
import { getAdminReport, getAdminTran } from "../api/report";

export const useGetAdminReport = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getAdminReport, {
    mutationKey: "GET_ADMIN_REPORT",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetAdminTran = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getAdminTran, {
    mutationKey: "GET_ADMIN_TRAN",
    ...options,
  });
  return { mutate, isLoading, data };
};
