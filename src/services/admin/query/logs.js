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
} from "../api/logs";

export const useGetValetedVehicles = (options = {}, page = 1, limit = 25) => {
  const { data, isLoading, refetch } = useQuery(
    ["GET_VALETED_VEHICLES", page, limit],
    () => getValetedVehicles(page, limit),
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

export const useGetParkedVehicles = (options = {}, page = 1, limit = 25) => {
  const { data, isLoading, refetch } = useQuery(
    ["GET_PARKED_VEHICLES", page, limit],
    () => getParkedVehicles(page, limit),
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

export const useGetServicedVehicles = (options = {}, page = 1, limit = 25) => {
  const { data, isLoading, refetch } = useQuery(
    ["GET_SERVICED_VEHICLES", page, limit],
    () => getServicedVehicles(page, limit),
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
