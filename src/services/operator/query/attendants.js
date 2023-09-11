import { useMutation } from "react-query";
import {
  createAttendant,
  deleteAttendant,
  getAttendant,
  getAttendants,
  updateAttendants,
} from "../api/attendants";

export const useGetAttendants = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getAttendants, {
    mutationKey: "GET_ATTENDANTS",
    ...options,
  });
  return { mutate, isLoading, data };
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
