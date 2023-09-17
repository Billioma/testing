import { useMutation, useQuery } from "react-query";
import {
  createLocation,
  createPolicy,
  createRate,
  createZone,
  deleteLocation,
  deletePolicy,
  deleteRate,
  deleteZone,
  getAmenities,
  getLocation,
  getLocations,
  getOperatorLocation,
  getPolicies,
  getPolicy,
  getRate,
  getRates,
  getZone,
  getZones,
  updateLocation,
  updatePolicy,
  updateRate,
  updateZone,
} from "../api/locations";

export const useGetLocations = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getLocations, {
    mutationKey: "GET_LOCATIONS",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetZones = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getZones, {
    mutationKey: "GET_ZONES",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetRates = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getRates, {
    mutationKey: "GET_RATES",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetPolicies = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getPolicies, {
    mutationKey: "GET_POLICIES",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetLocation = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getLocation, {
    mutationKey: "GET_LOCATION",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetOpLocation = (options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    "GET_OP_LOCATION",
    getOperatorLocation,
    {
      ...options,
    }
  );

  return { data, isLoading, refetch };
};

export const useGetZone = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getZone, {
    mutationKey: "GET_ZONE",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetRate = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getRate, {
    mutationKey: "GET_RATE",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetPolicy = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getPolicy, {
    mutationKey: "GET_POLICY",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetAmenities = (options = {}) => {
  const { data, isLoading, refetch } = useQuery("GET_AMENITIES", getAmenities, {
    ...options,
  });

  return { data, isLoading, refetch };
};

export const useDeleteLocation = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(deleteLocation, {
    mutationKey: "DELETE_LOCATION",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useDeleteZone = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(deleteZone, {
    mutationKey: "DELETE_ZONE",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useDeleteRate = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(deleteRate, {
    mutationKey: "DELETE_RATE",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useDeletePolicy = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(deletePolicy, {
    mutationKey: "DELETE_POLICY",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useUpdateLocation = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(updateLocation, {
    mutationKey: "UPDATE_LOCATION",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useUpdateZone = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(updateZone, {
    mutationKey: "UPDATE_ZONE",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useUpdateRate = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(updateRate, {
    mutationKey: "UPDATE_RATE",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useUpdatePolicy = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(updatePolicy, {
    mutationKey: "UPDATE_POLICY",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useCreateLocation = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(createLocation, {
    mutationKey: "CREATE_LOCATION",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useCreateZone = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(createZone, {
    mutationKey: "CREATE_ZONE",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useCreateRate = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(createRate, {
    mutationKey: "CREATE_RATE",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useCreatePolicy = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(createPolicy, {
    mutationKey: "CREATE_POLICY",
    ...options,
  });
  return { mutate, isLoading, data };
};
