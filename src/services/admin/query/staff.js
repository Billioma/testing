import { useMutation, useQuery } from "react-query";
import {
  addStaff,
  addStaffDoc,
  delEmployeeDoc,
  deleteStaff,
  editEmployeeDoc,
  editStaff,
  getStaff,
  getStaffs,
} from "../api/staff";

export const useAddStaff = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(addStaff, {
    mutationKey: ["ADMIN_ADD_STAFF"],
    ...options,
  });

  return { isLoading, data, mutate };
};

export const useAddStaffDoc = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(addStaffDoc, {
    mutationKey: ["addStaffDoc"],
    ...options,
  });

  return { isLoading, data, mutate };
};

export const useGetStaffs = (options = {}, page = 1, limit = 25, query) => {
  const { data, isLoading, refetch } = useQuery(
    ["GET_STAFFS", page, limit, query],
    () => getStaffs(page, limit, query),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

export const useGetStaff = (id = "", options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    ["GET_STAFF", id],
    () => getStaff(id),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

export const useEditStaff = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(editStaff, {
    mutationKey: ["EDIT_STAFF"],
    ...options,
  });

  return { isLoading, data, mutate };
};

export const useEditEmployeeDoc = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(editEmployeeDoc, {
    mutationKey: ["editEmployeeDoc"],
    ...options,
  });

  return { isLoading, data, mutate };
};

export const useDeleteStaff = (options = {}) => {
  const { isLoading, mutate } = useMutation(deleteStaff, {
    mutationKey: ["deleteStaff"],
    ...options,
  });

  return { isLoading, mutate };
};

export const useDelEmployeeDoc = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(delEmployeeDoc, {
    mutationKey: ["delEmployeeDoc"],
    ...options,
  });

  return { isLoading, data, mutate };
};
