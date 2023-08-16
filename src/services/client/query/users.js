import { useMutation } from "react-query";
import { attachUser, detachUser, getUsers, lookupUser } from "../api/users";

export const useGetUsers = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getUsers, {
    mutationKey: "GET_USERS",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useLookupUser = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(lookupUser, {
    mutationKey: "LOOKUP_USER",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useAttachUser = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(attachUser, {
    mutationKey: "ATTACH_USER",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useDetachUser = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(detachUser, {
    mutationKey: "DETACH_USER",
    ...options,
  });
  return { mutate, isLoading, data };
};
