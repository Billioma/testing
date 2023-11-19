import { useMutation, useQuery } from "react-query";
import {
  createMembershipPlan,
  getMembershipPlans,
  editMembershipPlan,
  createMembershipFeature,
  getMembershipFeatures,
  editMembershipFeature,
  getCustomerSubscriptions,
  editCustomerSubscription,
  createCustomerSubscription,
  createCorporateSubscription,
  editCorporateSubscription,
  getCorporateSubscriptions,
  deleteCorporateSubscription,
  deleteCustomerSubscription,
  deleteMembershipFeature,
  deleteMembershipPlan,
  cancelCustomerSubscription,
  renewCustomerSubscription,
  getCorporatePlans,
  renewCorporateSubscription,
  cancelCorporateSubscription,
  getAdminMembershipPlans,
  getAdminMembershipPlan,
  getAdminMembershipPlanFeatures,
  getAdminMembershipPlanFeature,
  getAdminCustomerSubs,
  getAdminCustomerSub,
  getAdminCorpSubs,
  getAdminCorpSub,
} from "../api/memberships";

export const useCreateMembershipPlan = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(createMembershipPlan, {
    mutationKey: ["CREATE_MEMBERSHIP_PLAN"],
    ...options,
  });

  return { isLoading, data, mutate };
};

export const useEditMembershipPlan = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(editMembershipPlan, {
    mutationKey: ["EDIT_MEMBERSHIP_PLAN"],
    ...options,
  });

  return { isLoading, data, mutate };
};

export const useGetMembershipPlans = (
  options = {},
  page = 1,
  limit = 25,
  query
) => {
  const { data, isLoading, refetch } = useQuery(
    ["GET_MEMBERSHIP_PLANS", page, limit, query],
    () => getMembershipPlans(page, limit, query),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

export const useGetAdminMembershipPlans = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getAdminMembershipPlans, {
    mutationKey: "GET_ADMIN_MembershipPlanS_LIST",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetAdminMembershipPlan = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getAdminMembershipPlan, {
    mutationKey: "GET_ADMIN_MembershipPlan",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetAdminMembershipPlanFeatures = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(
    getAdminMembershipPlanFeatures,
    {
      mutationKey: "getAdminMembershipPlanFeatures",
      ...options,
    }
  );
  return { mutate, isLoading, data };
};

export const useGetAdminMembershipPlanFeature = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(
    getAdminMembershipPlanFeature,
    {
      mutationKey: "getAdminMembershipPlanFeature",
      ...options,
    }
  );
  return { mutate, isLoading, data };
};

export const useGetAdminCustomerSubs = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getAdminCustomerSubs, {
    mutationKey: "getAdminCustomerSubs",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetAdminCustomerSub = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getAdminCustomerSub, {
    mutationKey: "getAdminCustomerSub",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetAdminCorpSubs = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getAdminCorpSubs, {
    mutationKey: "getAdminCorpSubs",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetAdminCorpSub = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getAdminCorpSub, {
    mutationKey: "getAdminCorpSub",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetCorporatePlans = (options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    ["GET_CORPORATE_PLANS"],
    () => getCorporatePlans(),
    { ...options }
  );

  return { data, isLoading, refetch };
};

export const useDeleteMembershipPlan = (options = {}) => {
  const { isLoading, mutate } = useMutation(deleteMembershipPlan, {
    mutationKey: ["DELETE_CORPORATE_SUB"],
    ...options,
  });

  return { isLoading, mutate };
};

export const useCreateMembershipFeature = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(createMembershipFeature, {
    mutationKey: ["CREATE_MEMBERSHIP_PLAN"],
    ...options,
  });

  return { isLoading, data, mutate };
};

export const useEditMembershipFeature = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(editMembershipFeature, {
    mutationKey: ["EDIT_MEMBERSHIP_PLAN"],
    ...options,
  });

  return { isLoading, data, mutate };
};

export const useGetMembershipFeatures = (
  options = {},
  page = 1,
  limit = 25,
  query
) => {
  const { data, isLoading, refetch } = useQuery(
    ["GET_MEMBERSHIP_FEATURES", page, limit, query],
    () => getMembershipFeatures(page, limit, query),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

export const useDeleteMembershipFeature = (options = {}) => {
  const { isLoading, mutate } = useMutation(deleteMembershipFeature, {
    mutationKey: ["DELETE_MEMBERSHIP_FEATURE"],
    ...options,
  });

  return { isLoading, mutate };
};

export const useCreateCustomerSubscription = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(createCustomerSubscription, {
    mutationKey: ["CREATE_CUSTOMER_SUB"],
    ...options,
  });

  return { isLoading, data, mutate };
};

export const useEditCustomerSubscription = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(editCustomerSubscription, {
    mutationKey: ["EDIT_CUSTOMER_SUB"],
    ...options,
  });

  return { isLoading, data, mutate };
};

export const useCancelCustomerSubscription = (options = {}) => {
  const { isLoading, mutate } = useMutation(cancelCustomerSubscription, {
    mutationKey: ["CANCEL_CUSTOMER_SUB"],
    ...options,
  });

  return { isLoading, mutate };
};

export const useRenewCustomerSubscription = (options = {}) => {
  const { isLoading, mutate } = useMutation(renewCustomerSubscription, {
    mutationKey: ["RENEW_CUSTOMER_SUB"],
    ...options,
  });

  return { isLoading, mutate };
};

export const useGetCustomerSubscriptions = (
  options = {},
  page = 1,
  limit = 25,
  query
) => {
  const { data, isLoading, refetch } = useQuery(
    ["GET_CUSTOMER_SUBS", page, limit, query],
    () => getCustomerSubscriptions(page, limit, query),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

export const useDeleteCustomerSubscription = (options = {}) => {
  const { isLoading, mutate } = useMutation(deleteCustomerSubscription, {
    mutationKey: ["DELETE_CUSTOMER_SUBS"],
    ...options,
  });

  return { isLoading, mutate };
};

export const useCreateCorporateSubscription = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(createCorporateSubscription, {
    mutationKey: ["CREATE_CORPORATE_SUB"],
    ...options,
  });

  return { isLoading, data, mutate };
};

export const useEditCorporateSubscription = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(editCorporateSubscription, {
    mutationKey: ["EDIT_CORPORATE_SUB"],
    ...options,
  });

  return { isLoading, data, mutate };
};

export const useGetCorporateSubscriptions = (
  options = {},
  page = 1,
  limit = 25,
  query
) => {
  const { data, isLoading, refetch } = useQuery(
    ["GET_CORPORATE_SUBS", page, limit, query],
    () => getCorporateSubscriptions(page, limit, query),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

export const useDeleteCorporateSubscription = (options = {}) => {
  const { isLoading, mutate } = useMutation(deleteCorporateSubscription, {
    mutationKey: ["DELETE_CORPORATE_SUB"],
    ...options,
  });

  return { isLoading, mutate };
};

export const useRenewCorporateSubscription = (options = {}) => {
  const { isLoading, mutate } = useMutation(renewCorporateSubscription, {
    mutationKey: ["RENEW_CORPORATE_SUB"],
    ...options,
  });

  return { isLoading, mutate };
};

export const useCancelCorporateSubscription = (options = {}) => {
  const { isLoading, mutate } = useMutation(cancelCorporateSubscription, {
    mutationKey: ["CANCEL_CORPORATE_SUB"],
    ...options,
  });

  return { isLoading, mutate };
};
