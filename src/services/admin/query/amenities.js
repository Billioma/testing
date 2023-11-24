import { useQuery, useMutation } from "react-query";
import {
  getAmenities,
  addAmenity,
  editAmenity,
  deleteAmenity,
} from "../api/amenities";

export const useGetAmenities = (options = {}, page = 1, limit = 25, query) => {
  const { data, isLoading, refetch } = useQuery(
    ["GET_AMENITIES", page, limit, query],
    () => getAmenities(page, limit, query),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

export const useAddAmenity = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(addAmenity, {
    mutationKey: ["ADMIN_ADD_AMENITY"],
    ...options,
  });

  return { isLoading, data, mutate };
};

export const useEditAmenity = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(editAmenity, {
    mutationKey: ["ADMIN_EDIT_AMENITY"],
    ...options,
  });

  return { isLoading, data, mutate };
};

export const useDeleteAmenity = (options = {}) => {
  const { isLoading, mutate } = useMutation(deleteAmenity, {
    mutationKey: ["DELETE_AMENITY"],
    ...options,
  });

  return { isLoading, mutate };
};
