import { useMutation, useQuery } from "react-query";
import {
  getLog,
  getOpParkedVehicles,
  getOpServicedVehicles,
  getOpValetedVehicles,
  getParked,
  getServiced,
  getValeted,
} from "../api/logs";

export const useGetValeted = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getValeted, {
    mutationKey: "GET_VALETED",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetOpParkedVehicles = (
  options = {},
  page = 1,
  limit = 25,
  query
) => {
  const { data, isLoading, refetch } = useQuery(
    ["GET_OP_PARKED_VEHICLES", page, limit, query],
    () => getOpParkedVehicles(page, limit, query),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

export const useGetOpValetedVehicles = (
  options = {},
  page = 1,
  limit = 25,
  query
) => {
  const { data, isLoading, refetch } = useQuery(
    ["GET_OP_VALETED_VEHICLES", page, limit, query],
    () => getOpValetedVehicles(page, limit, query),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

export const useGetOpServicedVehicles = (
  options = {},
  page = 1,
  limit = 25,
  query
) => {
  const { data, isLoading, refetch } = useQuery(
    ["GET_OP_SERVICED_VEHICLES", page, limit, query],
    () => getOpServicedVehicles(page, limit, query),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
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
