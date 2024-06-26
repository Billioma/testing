import { useMutation, useQuery } from "react-query";
import {
  createScheduleByLocation,
  createScheduleByStaff,
  delScheduleLocation,
  getScheduleDay,
  getScheduleLocation,
  getSchedules,
} from "../api/schedule";

export const useCreateScheduleByLocation = (options = {}) => {
  const { mutate, isLoading } = useMutation(createScheduleByLocation, {
    mutationKey: "createScheduleByLocation",
    ...options,
  });

  return { mutate, isLoading };
};

export const useDelScheduleLocation = (options = {}) => {
  const { mutate, isLoading } = useMutation(delScheduleLocation, {
    mutationKey: "delScheduleLocation",
    ...options,
  });

  return { mutate, isLoading };
};

export const useCreateScheduleByStaff = (options = {}) => {
  const { mutate, isLoading } = useMutation(createScheduleByStaff, {
    mutationKey: "createScheduleByStaff",
    ...options,
  });

  return { mutate, isLoading };
};

export const useGetScheduleDay = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getScheduleDay, {
    mutationKey: "getScheduleDay",
    ...options,
  });

  return { mutate, isLoading, data };
};

export const useGetScheduleLocation = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getScheduleLocation, {
    mutationKey: "getScheduleLocation",
    ...options,
  });

  return { mutate, isLoading, data };
};

export const useGetSchedules = (options = {}, page = 1, limit = 25, search) => {
  const { data, isLoading, refetch } = useQuery(
    ["getSchedules", page, limit, search],
    () => getSchedules(page, limit, search),
    {
      ...options,
    },
  );

  return { isLoading, data, refetch };
};
