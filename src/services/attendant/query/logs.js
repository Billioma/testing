import { useMutation, useQuery } from "react-query";
import {
  addVehicle,
  checkEvent,
  checkPtp,
  checkReserve,
  getAttMakes,
  getAttModels,
  getTickets,
  getUserRates,
  getUserVehicles,
  makePayment,
  newTicket,
  processEvent,
  processPtp,
  processReserve,
  retrieveTicket,
} from "../api/logs";

export const useGetUserVehicles = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getUserVehicles, {
    mutationKey: "getUserVehicles",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useCheckReserve = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(checkReserve, {
    mutationKey: "checkReserve",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useCheckPtp = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(checkPtp, {
    mutationKey: "checkPtp",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useProcessPtp = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(processPtp, {
    mutationKey: "processPtp",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useCheckEvent = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(checkEvent, {
    mutationKey: "checkEvent",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useProcessReserve = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(processReserve, {
    mutationKey: "processReserve",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useProcessEvent = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(processEvent, {
    mutationKey: "processEvent",
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
