import { useMutation, useQuery } from "react-query";
import {
  createService,
  getServices,
  editService,
  deleteService,
} from "../api/services";

export const useCreateService = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(createService, {
    mutationKey: ["CREATE_SERVICE"],
    ...options,
  });

  return { isLoading, data, mutate };
};

export const useEditService = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(editService, {
    mutationKey: ["EDIT_SERVICE"],
    ...options,
  });

  return { isLoading, data, mutate };
};

export const useGetServices = (options = {}, page = 1, limit = 25) => {
  const { data, isLoading, refetch } = useQuery(
    ["GET_SERVICES", page, limit],
    () => getServices(page, limit),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

export const useDeleteService = (options = {}) => {
  const { isLoading, mutate } = useMutation(deleteService, {
    mutationKey: ["DELETE_ADMIN_SERVICE"],
    ...options,
  });

  return { isLoading, mutate };
};
