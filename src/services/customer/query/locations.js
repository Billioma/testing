import { useMutation, useQuery } from "react-query";
import {
  getEvents,
  getLocations,
  getPlans,
  getServices,
  getStates,
  getZone,
} from "../api/locations";

export const useGetStates = (options = {}) => {
  const { data, isLoading, refetch } = useQuery("GET_STATES", getStates, {
    ...options,
  });

  return { data, isLoading, refetch };
};

export const useGetLocations = (options = {}) => {
  const { data, isLoading, refetch } = useQuery("GET_LOCATIONS", getLocations, {
    ...options,
  });

  return { data, isLoading, refetch };
};

export const useGetServices = (options = {}) => {
  const { data, isLoading, refetch } = useQuery("GET_SERVICES", getServices, {
    ...options,
  });

  return { data, isLoading, refetch };
};

export const useGetEvents = (options = {}) => {
  const { data, isLoading, refetch } = useQuery("GET_EVENTS", getEvents, {
    ...options,
  });

  return { data, isLoading, refetch };
};

export const useGetPlans = (options = {}) => {
  const { data, isLoading, refetch } = useQuery("GET_PLANS", getPlans, {
    ...options,
  });

  return { data, isLoading, refetch };
};

export const useGetZone = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getZone, {
    mutationKey: "GET_ZONE",
    ...options,
  });
  return { mutate, isLoading, data };
};
