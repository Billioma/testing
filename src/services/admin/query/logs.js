import { useQuery, useMutation } from "react-query";
import {
  getValetedVehicles,
  editValetedVehicle,
  deleteValetedVehicle,
  getParkedVehicles,
  editParkedVehicle,
  deleteParkedVehicle,
  editServicedVehicle,
  deleteServicedVehicle,
  getServicedVehicles,
  getAdminServiceLogs,
  getAdminServiceLog,
  editServiceLogs,
  makePaymentServiceLog,
  retrieveTickets,
} from "../api/logs";

export const useGetAdminServiceLogs = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getAdminServiceLogs, {
    mutationKey: "GET_ADMIN_SERVICE_LOGS_LIST",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetAdminServiceLog = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getAdminServiceLog, {
    mutationKey: "GET_ADMIN_SERVICE_LOG_DETAILS",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useMakePaymentServiceLog = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(makePaymentServiceLog, {
    mutationKey: "MAKE_PAYMENT_SRVICE_LOG",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useEditServiceLogs = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(editServiceLogs, {
    mutationKey: "UPDATE_ADMIN_SERVICE_LOG_DETAILS",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useRetrieveTickets = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(retrieveTickets, {
    mutationKey: "RETRIEVE_TICKETS",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetValetedVehicles = (
  options = {},
  page = 1,
  limit = 25,
  query
) => {
  const { data, isLoading, refetch } = useQuery(
    ["GET_VALETED_VEHICLES", page, limit, query],
    () => getValetedVehicles(page, limit, query),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

export const useEditValetedParking = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(editValetedVehicle, {
    mutationKey: ["ADMIN_EDIT_VALETED_PARKING"],
    ...options,
  });

  return { isLoading, data, mutate };
};

export const useDeleteValetedVehicle = (options = {}) => {
  const { isLoading, mutate } = useMutation(deleteValetedVehicle, {
    mutationKey: ["DELETE_VALETED_PARKING"],
    ...options,
  });

  return { isLoading, mutate };
};

export const useGetParkedVehicles = (
  options = {},
  page = 1,
  limit = 25,
  query
) => {
  const { data, isLoading, refetch } = useQuery(
    ["GET_PARKED_VEHICLES", page, limit, query],
    () => getParkedVehicles(page, limit, query),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

export const useEditParkedParking = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(editParkedVehicle, {
    mutationKey: ["ADMIN_EDIT_PARKED_PARKING"],
    ...options,
  });

  return { isLoading, data, mutate };
};

export const useDeleteParkedVehicle = (options = {}) => {
  const { isLoading, mutate } = useMutation(deleteParkedVehicle, {
    mutationKey: ["DELETE_PARKED_PARKING"],
    ...options,
  });

  return { isLoading, mutate };
};

export const useGetServicedVehicles = (
  options = {},
  page = 1,
  limit = 25,
  query
) => {
  const { data, isLoading, refetch } = useQuery(
    ["GET_SERVICED_VEHICLES", page, limit, query],
    () => getServicedVehicles(page, limit, query),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

export const useEditServicedParking = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(editServicedVehicle, {
    mutationKey: ["ADMIN_EDIT_SERVICED_PARKING"],
    ...options,
  });

  return { isLoading, data, mutate };
};

export const useDeleteServicedVehicle = (options = {}) => {
  const { isLoading, mutate } = useMutation(deleteServicedVehicle, {
    mutationKey: ["DELETE_SERVICED_PARKING"],
    ...options,
  });

  return { isLoading, mutate };
};
