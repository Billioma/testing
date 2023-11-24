import { useMutation, useQuery } from "react-query";
import {
  createAttendant,
  deleteAttendant,
  getAttendant,
  getAttendants,
  getOpAttendants,
  updateAttendants,
} from "../api/attendants";

export const useGetAttendants = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getAttendants, {
    mutationKey: "GET_ATTENDANTS",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetOpAttendant = (options = {}, page, limit, query) => {
  const { data, isLoading, refetch } = useQuery(
    ["GET_OP_ATTENDANTS", page, limit, query],
    () => getOpAttendants(page, limit, query),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

export const useDeleteAttendant = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(deleteAttendant, {
    mutationKey: "DELETE_ATTENDANT",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useCreateAttendant = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(createAttendant, {
    mutationKey: "CREATE_ATTENDANT",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useUpdateAttendants = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(updateAttendants, {
    mutationKey: "UPDATE_ATTENDANT",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetAttendant = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getAttendant, {
    mutationKey: "GET_ATTENDANT",
    ...options,
  });
  return { mutate, isLoading, data };
};
