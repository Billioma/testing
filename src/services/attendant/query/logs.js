import { useMutation, useQuery } from "react-query";
import {
  addVehicle,
  getAttMakes,
  getAttModels,
  getTickets,
  getUserRates,
  getUserVehicles,
  makePayment,
  newTicket,
  retrieveTicket,
} from "../api/logs";

export const useGetUserVehicles = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getUserVehicles, {
    mutationKey: "getUserVehicles",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useNewTicket = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(newTicket, {
    mutationKey: "newTicket",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useAddVehicle = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(addVehicle, {
    mutationKey: "addVehicle",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useRetrieveTicket = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(retrieveTicket, {
    mutationKey: "retrieveTicket",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useMakePayment = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(makePayment, {
    mutationKey: "makePayment",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetUserRates = (id, options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    ["getUserRates", id],
    getUserRates,
    {
      enabled: !!id,
      ...options,
    },
  );

  return { data, isLoading, refetch };
};

export const useGetTickets = (id, from, to, term, options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    ["getTickets", id, from, to, term],
    getTickets,
    {
      enabled: !!id,
      ...options,
    },
  );

  return { data, isLoading, refetch };
};

export const useGetAttMakes = (options = {}) => {
  const { data, isLoading, refetch } = useQuery("getAttMakes", getAttMakes, {
    ...options,
  });

  return { data, isLoading, refetch };
};

export const useGetAttModels = (options = {}) => {
  const { data, isLoading, refetch } = useQuery("getAttModels", getAttModels, {
    ...options,
  });

  return { data, isLoading, refetch };
};
