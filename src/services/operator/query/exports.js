import { useMutation } from "react-query";
import { expLoc, expLog, expPay, expZone } from "../api/exports";

export const useExpLoc = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(expLoc, {
    mutationKey: "EXP_LOC",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useExpLog = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(expLog, {
    mutationKey: "EXP_LOG",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useExpZone = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(expZone, {
    mutationKey: "EXP_ZONE",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useExpPay = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(expPay, {
    mutationKey: "EXP_PAY",
    ...options,
  });
  return { mutate, isLoading, data };
};
