import { useMutation, useQuery } from "react-query";
import {
  checkNoti,
  getUser,
  getUserNoti,
  getUserZones,
  updateAtt,
  updateAttPass,
} from "../api/user";

export const useGetUser = (options = {}) => {
  const { data, isLoading, refetch } = useQuery("GET_ATT_USER", getUser, {
    ...options,
  });

  return { data, isLoading, refetch };
};

export const useGetUserZones = (id, options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    ["getUserZones", id],
    getUserZones,
    {
      enabled: !!id,
      ...options,
    },
  );

  return { data, isLoading, refetch };
};

export const useGetUserNoti = (s, options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    ["getUserNoti", s],
    getUserNoti,
    {
      ...options,
    },
  );

  return { data, isLoading, refetch };
};

export const useCheckNoti = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(checkNoti, {
    mutationKey: "checkNoti",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useUpdateAtt = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(updateAtt, {
    mutationKey: "updateAtt",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useUpdateAttPass = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(updateAttPass, {
    mutationKey: "updateAttPass",
    ...options,
  });
  return { mutate, isLoading, data };
};
