import { useQuery, useMutation } from "react-query";
import {
  getRoles,
  editRole,
  deleteRole,
  editModel,
  getModels,
  deleteModel,
  editMake,
  getMakes,
  deleteMake,
  getBankDetails,
  editBankDetail,
  deleteBankDetail,
  getFaqs,
  editFaq,
  deleteFaq,
  addBankDetail,
  addFaq,
  addMake,
  addModel,
  addRole,
  getAdminRoles,
  getAdminRole,
  getAdminPermissions,
  getAdminPermission,
  editPermission,
  deletePermissions,
  addPermission,
  getPermissions,
  getAdminVehicleMakes,
  getAdminVehicleMake,
  getAdminVehicleModel,
  getAdminVehicleModels,
  getAdminFaqs,
  getAdminFaq,
  getAdminBank,
  getAdminBanks,
  getDepts,
  getJobs,
  getLocations,
} from "../api/configurations";

export const useGetRoles = (options = {}, page = 1, limit = 25, query) => {
  const { data, isLoading, refetch } = useQuery(
    ["ADMIN_GET_CONFIG_ROLES", page, limit, query],
    () => getRoles(page, limit, query),
    {
      ...options,
    },
  );

  return { isLoading, data, refetch };
};

export const useGetJobs = (options = {}, page = 1, limit = 25, query) => {
  const { data, isLoading, refetch } = useQuery(
    ["getJobs", page, limit, query],
    () => getJobs(page, limit, query),
    {
      ...options,
    },
  );

  return { isLoading, data, refetch };
};

export const useGetDepts = (options = {}, page = 1, limit = 25, query) => {
  const { data, isLoading, refetch } = useQuery(
    ["getDepts", page, limit, query],
    () => getDepts(page, limit, query),
    {
      ...options,
    },
  );

  return { isLoading, data, refetch };
};

export const useGetAdminRoles = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getAdminRoles, {
    mutationKey: "GET_ADMIN_ROLES_LIST",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetAdminRole = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getAdminRole, {
    mutationKey: "GET_ADMIN_ROLE",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetAdminPermissions = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getAdminPermissions, {
    mutationKey: "GET_ADMIN_PermissionS_LIST",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetAdminPermission = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getAdminPermission, {
    mutationKey: "GET_ADMIN_Permission",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetAdminVehicleMakes = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getAdminVehicleMakes, {
    mutationKey: "GET_ADMIN_VehicleMakeS_LIST",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetAdminVehicleMake = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getAdminVehicleMake, {
    mutationKey: "GET_ADMIN_VehicleMake",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetAdminVehicleModels = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getAdminVehicleModels, {
    mutationKey: "GET_ADMIN_VehicleModelS_LIST",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetAdminVehicleModel = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getAdminVehicleModel, {
    mutationKey: "GET_ADMIN_VehicleModel",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetAdminFaqs = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getAdminFaqs, {
    mutationKey: "GET_ADMIN_FaqS_LIST",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetAdminFaq = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getAdminFaq, {
    mutationKey: "GET_ADMIN_FAQ",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetAdminBanks = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getAdminBanks, {
    mutationKey: "GET_ADMIN_BANKS_LIST",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetAdminBank = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getAdminBank, {
    mutationKey: "GET_ADMIN_BANK",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useEditRole = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(editRole, {
    mutationKey: ["ADMIN_EDIT_CONFIG_ROLE"],
    ...options,
  });

  return { isLoading, data, mutate };
};

export const useEditPermission = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(editPermission, {
    mutationKey: ["ADMIN_EDIT_CONFIG_PERMISSIon"],
    ...options,
  });

  return { isLoading, data, mutate };
};

export const useGetPermissions = (
  options = {},
  page = 1,
  limit = 25,
  query,
) => {
  const { data, isLoading, refetch } = useQuery(
    ["GET_PERMISSIONS", page, limit, query],
    () => getPermissions(page, limit, query),
    {
      ...options,
    },
  );

  return { isLoading, data, refetch };
};

export const useDeleteRole = (options = {}) => {
  const { isLoading, mutate } = useMutation(deleteRole, {
    mutationKey: ["DELETE_CONFIG_ROLE"],
    ...options,
  });

  return { isLoading, mutate };
};

export const useDeletePermission = (options = {}) => {
  const { isLoading, mutate } = useMutation(deletePermissions, {
    mutationKey: ["DELETE_CONFIG_PERMISSION"],
    ...options,
  });

  return { isLoading, mutate };
};

export const useAddRole = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(addRole, {
    mutationKey: ["ADMIN_CONFIG_ADD_ROLE"],
    ...options,
  });
  return { isLoading, data, mutate };
};

export const useAddPermission = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(addPermission, {
    mutationKey: ["ADMIN_CONFIG_ADD_PERMISSION"],
    ...options,
  });

  return { isLoading, data, mutate };
};

export const useAddModel = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(addModel, {
    mutationKey: ["ADMIN_CONFIG_ADD_MODEL"],
    ...options,
  });

  return { isLoading, data, mutate };
};

export const useGetModels = (options = {}, page = 1, limit = 25, query) => {
  const { data, isLoading, refetch } = useQuery(
    ["ADMIN_GET_CONFIG_MODELS", page, limit, query],
    () => getModels(page, limit, query),
    {
      ...options,
    },
  );

  return { isLoading, data, refetch };
};

export const useEditModel = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(editModel, {
    mutationKey: ["ADMIN_EDIT_CONFIG_MODEL"],
    ...options,
  });

  return { isLoading, data, mutate };
};

export const useDeleteModel = (options = {}) => {
  const { isLoading, mutate } = useMutation(deleteModel, {
    mutationKey: ["DELETE_CONFIG_MODEL"],
    ...options,
  });

  return { isLoading, mutate };
};

export const useAddMake = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(addMake, {
    mutationKey: ["ADMIN_CONFIG_ADD_MAKE"],
    ...options,
  });

  return { isLoading, data, mutate };
};

export const useGetMakes = (options = {}, page = 1, limit = 25, query) => {
  const { data, isLoading, refetch } = useQuery(
    ["ADMIN_GET_CONFIG_MAKES", page, limit, query],
    () => getMakes(page, limit, query),
    {
      ...options,
    },
  );

  return { isLoading, data, refetch };
};

export const useEditMake = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(editMake, {
    mutationKey: ["ADMIN_EDIT_CONFIG_MAKE"],
    ...options,
  });

  return { isLoading, data, mutate };
};

export const useDeleteMake = (options = {}) => {
  const { isLoading, mutate } = useMutation(deleteMake, {
    mutationKey: ["DELETE_CONFIG_MAKE"],
    ...options,
  });

  return { isLoading, mutate };
};

export const useAddBankDetail = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(addBankDetail, {
    mutationKey: ["ADMIN_CONFIG_ADD_BANK_DETAIL"],
    ...options,
  });

  return { isLoading, data, mutate };
};

export const useGetBankDetails = (
  options = {},
  page = 1,
  limit = 25,
  query,
) => {
  const { data, isLoading, refetch } = useQuery(
    ["ADMIN_GET_CONFIG_BANK_DETAILS", page, limit, query],
    () => getBankDetails(page, limit, query),
    {
      ...options,
    },
  );

  return { isLoading, data, refetch };
};

export const useEditBankDetail = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(editBankDetail, {
    mutationKey: ["ADMIN_EDIT_CONFIG_BANK_DETAIL"],
    ...options,
  });

  return { isLoading, data, mutate };
};

export const useDeleteBankDetail = (options = {}) => {
  const { isLoading, mutate } = useMutation(deleteBankDetail, {
    mutationKey: ["DELETE_CONFIG_BANK_DETAIL"],
    ...options,
  });

  return { isLoading, mutate };
};

export const useAddFaq = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(addFaq, {
    mutationKey: ["ADMIN_CONFIG_ADD_FAQ"],
    ...options,
  });

  return { isLoading, data, mutate };
};

export const useGetFaqs = (options = {}, page = 1, limit = 25, query) => {
  const { data, isLoading, refetch } = useQuery(
    ["ADMIN_GET_CONFIG_FAQS", page, limit, query],
    () => getFaqs(page, limit, query),
    {
      ...options,
    },
  );

  return { isLoading, data, refetch };
};

export const useEditFaq = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(editFaq, {
    mutationKey: ["ADMIN_EDIT_CONFIG_FAQ"],
    ...options,
  });

  return { isLoading, data, mutate };
};

export const useDeleteFaq = (options = {}) => {
  const { isLoading, mutate } = useMutation(deleteFaq, {
    mutationKey: ["DELETE_CONFIG_FAQ"],
    ...options,
  });

  return { isLoading, mutate };
};

export const useGetAllLocations = (options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    ["getLocations"],
    () => getLocations(1, 10000),
    {
      ...options,
    },
  );

  return { isLoading, data, refetch };
};
