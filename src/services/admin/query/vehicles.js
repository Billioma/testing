import { useMutation, useQuery } from "react-query";
import {
  createVehicle,
  getVehicles,
  getMakes,
  getModel,
  deleteVehicle,
  getVehiclesList,
  getAdminVehicle,
  updateAdminVehicle,
} from "../api/vehicles";

export const useCreateVehicle = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(createVehicle, {
    mutationKey: ["CREATE_VEHICLE"],
    ...options,
  });

  return { isLoading, data, mutate };
};

export const useEditVehicle = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(updateAdminVehicle, {
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

export const useGetVehicleList = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getVehiclesList, {
    mutationKey: "VEHICLE_LIST",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetAdminVehicle = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getAdminVehicle, {
    mutationKey: "GET_ADMIN_VEHICLE",
    ...options,
  });
  return { mutate, isLoading, data };
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
