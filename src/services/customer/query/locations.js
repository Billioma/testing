import { useMutation, useQuery } from "react-query";
import {
  getEvents,
  getLocations,
  getPlans,
  getServices,
  getZone,
} from "../api/locations";
import { allStates } from "../../../components/common/constants";

export const useGetStates = () => {
  const data = { data: allStates };
  return { data, isLoading: false, refetch: () => data };
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
