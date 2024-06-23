import { useMutation, useQuery } from "react-query";
import { getUser, uploadPic } from "../api/user";

export const useGetUser = (options = {}) => {
  const { data, isLoading, refetch } = useQuery("GET_USER", getUser, {
    ...options,
  });

  return { data, isLoading, refetch };
};

export const useUploadPic = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(uploadPic, {
    mutationKey: "uploadPic",
    ...options,
  });
  return { mutate, isLoading, data };
};
