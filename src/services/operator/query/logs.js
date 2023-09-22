import { useMutation } from "react-query";
import { getLog, getParked, getServiced, getValeted } from "../api/logs";

export const useGetValeted = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getValeted, {
    mutationKey: "GET_VALETED",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetParked = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getParked, {
    mutationKey: "GET_PARKED",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetServiced = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getServiced, {
    mutationKey: "GET_SERVICED",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetLog = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getLog, {
    mutationKey: "GET_LOG",
    ...options,
  });
  return { mutate, isLoading, data };
};
