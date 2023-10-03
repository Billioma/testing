import { useMutation, useQuery } from "react-query";
import {
  createClientSub,
  getClientSubs,
  getMemPlan,
} from "../api/subscription";

export const useGetMemPlan = (options = {}) => {
  const { data, isLoading, refetch } = useQuery("GET_MEM_PLAN", getMemPlan, {
    ...options,
  });

  return { data, isLoading, refetch };
};

export const useGetClientSubs = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getClientSubs, {
    mutationKey: "GET_CLIENT_SUBS",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useCreateClientSub = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(createClientSub, {
    mutationKey: "CREATE_SUB",
    ...options,
  });
  return { mutate, isLoading, data };
};
