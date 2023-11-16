import { useQuery, useMutation } from "react-query";
import {
  getLocations,
  getZones,
  addLocation,
  editLocation,
  deleteLocation,
  addZone,
  editZone,
  deleteZone,
  getRates,
  deleteRate,
  addRate,
  editRate,
  getPolicies,
  editPolicy,
  addPolicy,
  deletePolicy,
  getAdminLocations,
  getAdminLocation,
  getAdminZones,
  getAdminZone,
  getAdminRate,
  getAdminRates,
  getAdminAmenity,
  getAdminAmenities,
  getAdminPolicy,
  getAdminPolicies,
} from "../api/locations";

export const useGetAllLocations = (options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    ["GET_ALL_LOCATIONS"],
    () => getLocations(1, 10000),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

export const useGetLocations = (options = {}, page = 1, limit = 25, query) => {
  const { data, isLoading, refetch } = useQuery(
    ["GET_LOCATIONS", page, limit, query],
    () => getLocations(page, limit, query),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

export const useGetAdminLocations = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getAdminLocations, {
    mutationKey: "GET_ADMIN_LOCATIONS_LIST",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetAdminLocation = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getAdminLocation, {
    mutationKey: "GET_ADMIN_LOCATION",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetAdminZones = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getAdminZones, {
    mutationKey: "GET_ADMIN_ZONES_LIST",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetAdminZone = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getAdminZone, {
    mutationKey: "GET_ADMIN_ZONE",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useAddLocation = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(addLocation, {
    mutationKey: ["ADMIN_ADD_LOCATION"],
    ...options,
  });

  return { isLoading, data, mutate };
};

export const useEditLocation = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(editLocation, {
    mutationKey: ["ADMIN_EDIT_LOCATION"],
    ...options,
  });

  return { isLoading, data, mutate };
};

export const useGetZones = (options = {}, page = 1, limit = 25, query) => {
  const { data, isLoading, refetch } = useQuery(
    ["GET_ZONES", page, limit, query],
    () => getZones(page, limit, query),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

export const useDeleteLocation = (options = {}) => {
  const { isLoading, mutate } = useMutation(deleteLocation, {
    mutationKey: ["DELETE_LOCATION"],
    ...options,
  });

  return { isLoading, mutate };
};

export const useAddZone = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(addZone, {
    mutationKey: ["ADMIN_ADD_ZONE"],
    ...options,
  });

  return { isLoading, data, mutate };
};

export const useEditZone = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(editZone, {
    mutationKey: ["ADMIN_EDIT_ZONE"],
    ...options,
  });

  return { isLoading, data, mutate };
};

export const useDeleteZone = (options = {}) => {
  const { isLoading, mutate } = useMutation(deleteZone, {
    mutationKey: ["DELETE_ZONE"],
    ...options,
  });

  return { isLoading, mutate };
};

export const useGetRates = (options = {}, page = 1, limit = 25, query) => {
  const { data, isLoading, refetch } = useQuery(
    ["GET_RATES", page, limit, query],
    () => getRates(page, limit, query),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};


export const useGetAdminRates = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getAdminRates, {
    mutationKey: "GET_ADMIN_RATES_LIST",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetAdminRate = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getAdminRate, {
    mutationKey: "GET_ADMIN_RATE",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetAdminAmenities = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getAdminAmenities, {
    mutationKey: "GET_ADMIN_AMENITIES_LIST",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetAdminAmenity = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getAdminAmenity, {
    mutationKey: "GET_ADMIN_AMENTIY",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetAdminPolicies = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getAdminPolicies, {
    mutationKey: "GET_ADMIN_POLICIES_LIST",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetAdminPolicy = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getAdminPolicy, {
    mutationKey: "GET_ADMIN_POLICY",
    ...options,
  });
  return { mutate, isLoading, data };
};


export const useDeleteRate = (options = {}) => {
  const { isLoading, mutate } = useMutation(deleteRate, {
    mutationKey: ["DELETE_RATE"],
    ...options,
  });

  return { isLoading, mutate };
};

export const useAddRate = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(addRate, {
    mutationKey: ["ADMIN_ADD_RATE"],
    ...options,
  });

  return { isLoading, data, mutate };
};

export const useEditRate = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(editRate, {
    mutationKey: ["ADMIN_EDIT_RATE"],
    ...options,
  });

  return { isLoading, data, mutate };
};

export const useGetPolicies = (options = {}, page = 1, limit = 25, query) => {
  const { data, isLoading, refetch } = useQuery(
    ["GET_POLICIES", page, limit, query],
    () => getPolicies(page, limit, query),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

export const useDeletePolicy = (options = {}) => {
  const { isLoading, mutate } = useMutation(deletePolicy, {
    mutationKey: ["DELETE_POLICY"],
    ...options,
  });

  return { isLoading, mutate };
};

export const useAddPolicy = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(addPolicy, {
    mutationKey: ["ADMIN_ADD_POLICY"],
    ...options,
  });

  return { isLoading, data, mutate };
};

export const useEditPolicy = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(editPolicy, {
    mutationKey: ["ADMIN_EDIT_POLICY"],
    ...options,
  });

  return { isLoading, data, mutate };
};
