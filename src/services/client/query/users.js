import { useMutation, useQuery } from "react-query";
import {
  attachUser,
  detachUser,
  getClientUsers,
  getClientsUsers,
  getUsers,
  lookupUser,
} from "../api/users";

export const useGetUsers = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getUsers, {
    mutationKey: "GET_USERS",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetClientsUsers = (
  options = {},
  page = 1,
  limit = 25,
  query
) => {
  const { data, isLoading, refetch } = useQuery(
    ["GET_CLIENTS_EVENTS", limit, page, query],
    () => getClientsUsers(page, limit, query),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

export const useGetClientusers = (options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    "GET_CLIENT_USERS",
    getClientUsers,
    {
      ...options,
    }
  );

  return { data, isLoading, refetch };
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
