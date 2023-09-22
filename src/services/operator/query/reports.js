import { useMutation } from "react-query";
import {
  getRepLocations,
  getRepLogs,
  getRepPayments,
  getRepZones,
} from "../api/reports";

export const useGetRepPayment = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getRepPayments, {
    mutationKey: "GET_REP_PAYMENT",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetRepZone = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getRepZones, {
    mutationKey: "GET_REP_ZONE",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetRepLogs = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getRepLogs, {
    mutationKey: "GET_REP_LOGS",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetRepLocation = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getRepLocations, {
    mutationKey: "GET_REP_LOCATIONS",
    ...options,
  });
  return { mutate, isLoading, data };
};
