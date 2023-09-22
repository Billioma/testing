import axiosInstance from "../../axiosInstance";
import * as API from "../url";

export const getMembershipPlans = async (page, limit, corporate) => {
  const response = await axiosInstance.get(
    API.ADMIN_MEMBERSHIP_PLANS +
      `?page=${page}&limit=${limit}${
        corporate ? "&corporate=1" : ""
      }&sort=id,DESC`
  );
  return response.data;
};

export const editMembershipPlan = async (data) => {
  const response = await axiosInstance.patch(
    `${API.ADMIN_MEMBERSHIP_PLANS}/${data.id}`,
    data
  );

  return response.data;
};

export const createMembershipPlan = async (data) => {
  const response = await axiosInstance.post(API.ADMIN_MEMBERSHIP_PLANS, data);
  return response.data;
};

export const getMembershipFeatures = async (page, limit) => {
  const response = await axiosInstance.get(
    API.ADMIN_MEMBERSHIP_FEATURES + `?page=${page}&limit=${limit}&sort=id,DESC`
  );
  return response.data;
};

export const editMembershipFeature = async (data) => {
  const response = await axiosInstance.patch(
    `${API.ADMIN_MEMBERSHIP_FEATURES}/${data.id}`,
    data
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

export const getCustomerSubscriptions = async (page, limit) => {
  const response = await axiosInstance.get(
    API.ADMIN_CUSTOMER_SUBSCRITIONS +
      `?page=${page}&limit=${limit}&sort=id,DESC`
  );
  return response.data;
};

export const editCustomerSubscription = async (data) => {
  const response = await axiosInstance.patch(
    `${API.ADMIN_CUSTOMER_SUBSCRITIONS}/${data.id}`,
    data
  );

  return response.data;
};

export const createCorporateSubscription = async (data) => {
  const response = await axiosInstance.post(
    API.ADMIN_CUSTOMER_SUBSCRITIONS,
    data
  );
  return response.data;
};

export const getCorporateSubscriptions = async (page, limit) => {
  const response = await axiosInstance.get(
    API.ADMIN_CORPORATE_SUBSCRITIONS +
      `?page=${page}&limit=${limit}&sort=id,DESC`
  );
  return response.data;
};

export const editCorporateSubscription = async (data) => {
  const response = await axiosInstance.patch(
    `${API.ADMIN_CORPORATE_SUBSCRITIONS}/${data.id}`,
    data
  );

  return response.data;
};

export const createCustomerSubscription = async (data) => {
  const response = await axiosInstance.post(
    API.ADMIN_CORPORATE_SUBSCRITIONS,
    data
  );
  return response.data;
};

export const deleteCorporateSubscription = async (id) => {
  const response = await axiosInstance.delete(
    `${API.ADMIN_CORPORATE_SUBSCRITIONS}/${id}`
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
    `${API.ADMIN_CUSTOMER_SUBSCRITIONS}/${id}`
  );

  return response.data;
};
