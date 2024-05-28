import { useMutation, useQuery } from "react-query";
import {
  getLeave,
  getLeaveBalance,
  getLeaveDetails,
  requestLeave,
  updateLeave,
  withdrawLeave,
} from "../api/leave";

export const useRequestLeave = (options = {}) => {
  const { mutate, isLoading } = useMutation(requestLeave, {
    mutationKey: "requestLeave",
    ...options,
  });
  return { mutate, isLoading };
};

export const useUpdateLeave = (options = {}) => {
  const { isLoading, mutate } = useMutation(updateLeave, {
    mutationKey: ["updateLeave"],
    ...options,
  });

  return { isLoading, mutate };
};

export const useGetLeaveRequest = (options = {}, page = 1, limit = 25) => {
  const { data, isLoading, refetch } = useQuery(
    ["getLeave", page, limit],
    () => getLeave(page, limit),
    {
      ...options,
    },
  );

  return { data, isLoading, refetch };
};

export const useGetLeaveBalance = (options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    "getLeaveBalance",
    getLeaveBalance,
    {
      ...options,
    },
  );

  return { data, isLoading, refetch };
};

export const useGetLeave = (id = "", options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    ["getLeaveDetails", id],
    () => getLeaveDetails(id),
    {
      ...options,
    },
  );

  return { isLoading, data, refetch };
};

export const useWithdrawLeave = (options = {}) => {
  const { isLoading, mutate } = useMutation(withdrawLeave, {
    mutationKey: ["withdrawLeave"],
    ...options,
  });

  return { isLoading, mutate };
};
