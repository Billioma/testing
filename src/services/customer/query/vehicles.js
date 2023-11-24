import { useMutation, useQuery } from "react-query";
import {
  claimVehicles,
  createVehicles,
  deleteVehicles,
  getMakes,
  getModel,
  getVehicles,
  updateVehicles,
} from "../api/vehicles";

export const useGetVehicles = (options = {}) => {
  const { data, isLoading, refetch } = useQuery("GET_VEHICLES", getVehicles, {
    ...options,
  });

  return { data, isLoading, refetch };
};

export const useCreateVehicles = (options = {}) => {
  const { mutate, isLoading } = useMutation(createVehicles, {
    mutationKey: "CREATE_VEHICLES",
    ...options,
  });
  return { mutate, isLoading };
};

export const useClaimVehicles = (options = {}) => {
  const { mutate, isLoading } = useMutation(claimVehicles, {
    mutationKey: "CLAIM_VEHICLES",
    ...options,
  });
  return { mutate, isLoading };
};

export const useUpdateVehicles = (options = {}) => {
  const { mutate, isLoading } = useMutation(updateVehicles, {
    mutationKey: "UPDATE_VEHICLES",
    ...options,
  });
  return { mutate, isLoading };
};

export const useDeleteVehicles = (options = {}) => {
  const { mutate, isLoading } = useMutation(deleteVehicles, {
    mutationKey: "DEL_VEHICLES",
    ...options,
  });
  return { mutate, isLoading };
};

export const useGetMake = (options = {}) => {
  const { data, isLoading, refetch } = useQuery("GET_MAKE", getMakes, {
    ...options,
  });

  return { data, isLoading, refetch };
};

export const useGetModel = (options = {}) => {
  const { data, isLoading, refetch } = useQuery("GET_MODEL", getModel, {
    ...options,
  });

  return { data, isLoading, refetch };
};
