import { useMutation } from "react-query";
import { createPayToPark, getPayToPark } from "../api/services";

export const useGetPayToPark = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getPayToPark, {
    mutationKey: "GET_PAY_TO_PARK",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useCreatePayToPark = (options = {}) => {
  const { mutate, isLoading } = useMutation(createPayToPark, {
    mutationKey: "CREATE_PAY_TO_PARK",
    ...options,
  });
  return { mutate, isLoading };
};
