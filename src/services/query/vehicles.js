import { useMutation, useQuery } from "react-query";
import {
  createVehicles,
  getMakes,
  getModel,
  getVehicles,
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
