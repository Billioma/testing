import { useMutation, useQuery } from "react-query";
import {
  activateStaff,
  addStaff,
  addStaffDoc,
  approveLeave,
  approveLicense,
  delEmployeeDoc,
  deleteStaff,
  editEmployeeDoc,
  editStaff,
  getLeave,
  getLeaveDetails,
  getStaff,
  getStaffs,
  rejectLeave,
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

export const useActivateStaff = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(activateStaff, {
    mutationKey: ["activateStaff"],
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

export const useApproveLicense = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(approveLicense, {
    mutationKey: ["approveLicense"],
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

export const useApproveLeave = (options = {}) => {
  const { isLoading, mutate } = useMutation(approveLeave, {
    mutationKey: ["approveLeave"],
    ...options,
  });

  return { isLoading, mutate };
};

export const useRejectLeave = (options = {}) => {
  const { isLoading, mutate } = useMutation(rejectLeave, {
    mutationKey: ["rejectLeave"],
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

export const useGetLeaveRequest = (
  options = {},
  type = "",
  page = 1,
  limit = 25,
  query
) => {
  const { data, isLoading, refetch } = useQuery(
    ["getLeave", type, page, limit, query],
    () => getLeave(type, page, limit, query),
    {
      ...options,
    }
  );

  return { data, isLoading, refetch };
};

export const useGetLeave = (id = "", options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    ["getLeaveDetails", id],
    () => getLeaveDetails(id),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};
