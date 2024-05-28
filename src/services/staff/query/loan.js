import { useMutation, useQuery } from "react-query";
import {
  getLoan,
  getLoanBalance,
  getLoanDetails,
  requestLoan,
  updateLoan,
  withdrawLoan,
} from "../api/loan";

export const useRequestLoan = (options = {}) => {
  const { mutate, isLoading } = useMutation(requestLoan, {
    mutationKey: "requestLoan",
    ...options,
  });
  return { mutate, isLoading };
};

export const useUpdateLoan = (options = {}) => {
  const { isLoading, mutate } = useMutation(updateLoan, {
    mutationKey: ["updateLoan"],
    ...options,
  });

  return { isLoading, mutate };
};

export const useWithdrawLoan = (options = {}) => {
  const { isLoading, mutate } = useMutation(withdrawLoan, {
    mutationKey: ["withdrawLoan"],
    ...options,
  });

  return { isLoading, mutate };
};

export const useGetLoanRequest = (options = {}, page = 1, limit = 25) => {
  const { data, isLoading, refetch } = useQuery(
    ["getLoan", page, limit],
    () => getLoan(page, limit),
    {
      ...options,
    },
  );

  return { data, isLoading, refetch };
};

export const useGetLoanBalance = (options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    "getLoanBalance",
    getLoanBalance,
    {
      ...options,
    },
  );

  return { data, isLoading, refetch };
};

export const useGetLoan = (id = "", options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    ["getLoanDetails", id],
    () => getLoanDetails(id),
    {
      ...options,
    },
  );

  return { isLoading, data, refetch };
};
