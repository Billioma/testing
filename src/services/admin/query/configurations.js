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
} from "../api/configurations";

export const useGetRoles = (options = {}, page = 1, limit = 25, query) => {
  const { data, isLoading, refetch } = useQuery(
    ["ADMIN_GET_CONFIG_ROLES", page, limit, query],
    () => getRoles(page, limit, query),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

export const useEditRole = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(editRole, {
    mutationKey: ["ADMIN_EDIT_CONFIG_ROLE"],
    ...options,
  });

  return { isLoading, data, mutate };
};

export const useDeleteRole = (options = {}) => {
  const { isLoading, mutate } = useMutation(deleteRole, {
    mutationKey: ["DELETE_CONFIG_ROLE"],
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
    }
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
    }
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
  query
) => {
  const { data, isLoading, refetch } = useQuery(
    ["ADMIN_GET_CONFIG_BANK_DETAILS", page, limit, query],
    () => getBankDetails(page, limit, query),
    {
      ...options,
    }
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
    }
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
