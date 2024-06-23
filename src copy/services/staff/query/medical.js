import { useMutation, useQuery } from "react-query";
import {
  getMed,
  getMedDetails,
  requestMed,
  updateMed,
  withdrawMed,
} from "../api/medical";

export const useRequestMed = (options = {}) => {
  const { mutate, isLoading } = useMutation(requestMed, {
    mutationKey: "requestMed",
    ...options,
  });
  return { mutate, isLoading };
};

export const useUpdateMed = (options = {}) => {
  const { isLoading, mutate } = useMutation(updateMed, {
    mutationKey: ["updateMed"],
    ...options,
  });

  return { isLoading, mutate };
};

export const useWithdrawMed = (options = {}) => {
  const { isLoading, mutate } = useMutation(withdrawMed, {
    mutationKey: ["withdrawMed"],
    ...options,
  });

  return { isLoading, mutate };
};

export const useGetMedRequest = (options = {}, page = 1, limit = 25) => {
  const { data, isLoading, refetch } = useQuery(
    ["getMed", page, limit],
    () => getMed(page, limit),
    {
      ...options,
    },
  );

  return { data, isLoading, refetch };
};

export const useGetMed = (id = "", options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    ["getMedDetails", id],
    () => getMedDetails(id),
    {
      ...options,
    },
  );

  return { isLoading, data, refetch };
};
