import { useMutation, useQuery } from "react-query";
import {
  createVehicle,
  getVehicles,
  editVehicle,
  getMakes,
  getModel,
  deleteVehicle,
} from "../api/vehicles";

export const useCreateVehicle = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(createVehicle, {
    mutationKey: ["CREATE_VEHICLE"],
    ...options,
  });

  return { isLoading, data, mutate };
};

export const useEditVehicle = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(editVehicle, {
    mutationKey: ["EDIT_VEHICLE"],
    ...options,
  });

  return { isLoading, data, mutate };
};

export const useDeleteVehicle = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(deleteVehicle, {
    mutationKey: ["DELETE_VEHICLE"],
    ...options,
  });

  return { isLoading, data, mutate };
};

export const useGetVehicles = (options = {}, page = 1, limit = 25, query) => {
  const { data, isLoading, refetch } = useQuery(
    ["GET_VEHICLES", page, limit, query],
    () => getVehicles(page, limit, query),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

export const useGetMake = (options = {}) => {
  const { data, isLoading, refetch } = useQuery("ADMIN_GET_MAKE", getMakes, {
    ...options,
  });

  return { data, isLoading, refetch };
};

export const useGetModel = (options = {}) => {
  const { data, isLoading, refetch } = useQuery("ADMIN_GET_MODEL", getModel, {
    ...options,
  });

  return { data, isLoading, refetch };
};
