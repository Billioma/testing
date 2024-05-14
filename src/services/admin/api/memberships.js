import axiosInstance from "../../axiosInstance";
import * as API from "../url";

export const getMembershipPlans = async (page, limit, query) => {
  const response = await axiosInstance.get(
    API.ADMIN_MEMBERSHIP_PLANS +
      `?page=${page}&limit=${limit}&sort=createdAt,DESC&${query || ""}`
  );
  return response.data;
};

export const getAdminMembershipPlans = async (query) => {
  const res = await axiosInstance.get(
    API.ADMIN_MEMBERSHIP_PLANS_LIST(query.filterString, query.limit, query.page)
  );
  return res.data;
};

export const getAdminMembershipPlan = async (query) => {
  const res = await axiosInstance.get(API.ADMIN_MEMBERSHIP_PLAN(query.id));
  return res.data;
};

export const getAdminMembershipPlanFeatures = async (query) => {
  const res = await axiosInstance.get(
    API.ADMIN_MEMBERSHIP_FEATURES_LIST(
      query.filterString,
      query.limit,
      query.page
    )
  );
  return res.data;
};

export const getAdminMembershipPlanFeature = async (query) => {
  const res = await axiosInstance.get(API.ADMIN_MEMBERSHIP_FEATURE(query.id));
  return res.data;
};

export const getAdminCustomerSubs = async (query) => {
  const res = await axiosInstance.get(
    API.ADMIN_CUSTOMER_SUBS_LIST(query.filterString, query.limit, query.page)
  );
  return res.data;
};

export const getAdminCustomerSub = async (query) => {
  const res = await axiosInstance.get(API.ADMIN_CUSTOMER_SUB(query.id));
  return res.data;
};

export const getAdminCorpSubs = async (query) => {
  const res = await axiosInstance.get(
    API.ADMIN_CORP_SUBS_LIST(query.filterString, query.limit, query.page)
  );
  return res.data;
};

export const getAdminCorpSub = async (query) => {
  const res = await axiosInstance.get(API.ADMIN_CORP_SUB(query.id));
  return res.data;
};

export const getCorporatePlans = async () => {
  const response = await axiosInstance.get(
    API.ADMIN_CORPORATE_PLANS + `?corporate=1`
  );
  return response.data;
};

export const editMembershipPlan = async ({ query, body }) => {
  const response = await axiosInstance.patch(
    API.ADMIN_MEMBERSHIP_PLAN(query),
    body
  );

  return response.data;
};

export const createMembershipPlan = async (data) => {
  const response = await axiosInstance.post(API.ADMIN_MEMBERSHIP_PLANS, data);
  return response.data;
};

export const getMembershipFeatures = async (page, limit, query) => {
  const response = await axiosInstance.get(
    API.ADMIN_MEMBERSHIP_FEATURES +
      `?page=${page}&limit=${limit}&sort=createdAt,DESC&${query || ""}`
  );
  return response.data;
};

export const editMembershipFeature = async ({ query, body }) => {
  const response = await axiosInstance.patch(
    API.ADMIN_MEMBERSHIP_FEATURE(query),
    body
  );

  return response.data;
};

export const createMembershipFeature = async (data) => {
  const response = await axiosInstance.post(
    API.ADMIN_MEMBERSHIP_FEATURES,
    data
  );
  return response.data;
};

export const getCustomerSubscriptions = async (page, limit, query) => {
  const response = await axiosInstance.get(
    API.ADMIN_CUSTOMER_SUBSCRIPTIONS +
      `?page=${page}&limit=${limit}&sort=createdAt,DESC&${query || ""}`
  );
  return response.data;
};

export const editCustomerSubscription = async ({ query, body }) => {
  const response = await axiosInstance.patch(
    API.ADMIN_CUSTOMER_SUBSCRIPTION(query),
    body
  );

  return response.data;
};

export const createCorporateSubscription = async (data) => {
  const response = await axiosInstance.post(
    API.ADMIN_CORPORATE_SUBSCRIPTIONS,
    data
  );
  return response.data;
};

export const getCorporateSubscriptions = async (page, limit, query) => {
  const response = await axiosInstance.get(
    API.ADMIN_CORPORATE_SUBSCRIPTIONS +
      `?page=${page}&limit=${limit}&sort=createdAt,DESC&${query || ""}`
  );
  return response.data;
};

export const editCorporateSubscription = async ({ query, body }) => {
  const response = await axiosInstance.patch(API.ADMIN_CORP_SUB(query), body);

  return response.data;
};

export const createCustomerSubscription = async (data) => {
  const response = await axiosInstance.post(
    API.ADMIN_CUSTOMER_SUBSCRIPTIONS,
    data
  );
  return response.data;
};

export const deleteCorporateSubscription = async (id) => {
  const response = await axiosInstance.delete(
    `${API.ADMIN_CORPORATE_SUBSCRIPTIONS}/${id}`
  );
  return response.data;
};

export const deleteMembershipPlan = async (id) => {
  const response = await axiosInstance.delete(
    `${API.ADMIN_MEMBERSHIP_PLANS}/${id}`
  );
  return response.data;
};

export const deleteMembershipFeature = async (id) => {
  const response = await axiosInstance.delete(
    `${API.ADMIN_MEMBERSHIP_FEATURES}/${id}`
  );

  return response.data;
};

export const deleteCustomerSubscription = async (id) => {
  const response = await axiosInstance.delete(
    `${API.ADMIN_CUSTOMER_SUBSCRIPTIONS}/${id}`
  );

  return response.data;
};

export const renewCustomerSubscription = async ({ id, body }) => {
  const response = await axiosInstance.post(
    `${API.ADMIN_CUSTOMER_SUBSCRIPTIONS}/renew/${id}`,
    body
  );

  return response.data;
};

export const cancelCustomerSubscription = async (id) => {
  const response = await axiosInstance.get(
    `${API.ADMIN_CUSTOMER_SUBSCRIPTIONS}/cancel/${id}`
  );

  return response.data;
};

export const renewCorporateSubscription = async ({ id, body }) => {
  const response = await axiosInstance.post(
    `${API.ADMIN_CORPORATE_SUBSCRIPTIONS}/renew/${id}`,
    body
  );

  return response.data;
};

export const cancelCorporateSubscription = async (id) => {
  const response = await axiosInstance.get(
    `${API.ADMIN_CORPORATE_SUBSCRIPTIONS}/cancel/${id}`
  );

  return response.data;
};
