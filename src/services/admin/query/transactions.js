import { useMutation, useQuery } from "react-query";
import {
  getPayToPark,
  deletePayToPark,
  getReservedParking,
  deleteReservedParking,
  editReservedParking,
  addReservedParking,
  getCarServices,
} from "../api/transactions";

export const useGetPayToPark = (options = {}, page = 1, limit = 25) => {
  const { data, isLoading, refetch } = useQuery(
    ["GET_PAYTOPARK", page, limit],
    () => getPayToPark(page, limit),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

export const useDeletePayToPark = (options = {}) => {
  const { isLoading, mutate } = useMutation(deletePayToPark, {
    mutationKey: ["DELETE_PAY_TO_PARK"],
    ...options,
  });

  return { isLoading, mutate };
};

export const useDeleteReservedParking = (options = {}) => {
  const { isLoading, mutate } = useMutation(deleteReservedParking, {
    mutationKey: ["DELETE_RESERVED_PARKING"],
    ...options,
  });

  return { isLoading, mutate };
};

export const useEditReservedParking = (options = {}) => {
  const { isLoading, mutate } = useMutation(editReservedParking, {
    mutationKey: ["EDIT_RESERVED_PARKING"],
    ...options,
  });

  return { isLoading, mutate };
};

export const useAddReservedParking = (options = {}) => {
  const { isLoading, mutate } = useMutation(addReservedParking, {
    mutationKey: ["ADD_RESERVED_PARKING"],
    ...options,
  });

  return { isLoading, mutate };
};

export const useGetReservedParking = (options = {}, page = 1, limit = 25) => {
  const { data, isLoading, refetch } = useQuery(
    ["GET_RESERVED_PARKING", page, limit],
    () => getReservedParking(page, limit),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

export const useGetCarServices = (options = {}, page = 1, limit = 25) => {
  const { data, isLoading, refetch } = useQuery(
    ["GET_CAR_SERVICES", page, limit],
    () => getCarServices(page, limit),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};
