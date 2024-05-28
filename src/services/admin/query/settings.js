import { useMutation, useQuery } from "react-query";
import { addDept, editDept, getDept, getDepts } from "../api/settings";

export const useAddDept = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(addDept, {
    mutationKey: ["addDept"],
    ...options,
  });

  return { isLoading, data, mutate };
};

export const useGetDepts = (options = {}, page = 1, limit = 25, query) => {
  const { data, isLoading, refetch } = useQuery(
    ["getDepts", page, limit, query],
    () => getDepts(page, limit, query),
    {
      ...options,
    },
  );

  return { isLoading, data, refetch };
};

export const useGetDept = (id = "", options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    ["getDept", id],
    () => getDept(id),
    {
      ...options,
    },
  );

  return { isLoading, data, refetch };
};

export const useEditDept = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(editDept, {
    mutationKey: ["editDept"],
    ...options,
  });

  return { isLoading, data, mutate };
};
