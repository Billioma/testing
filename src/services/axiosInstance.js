import axios from "axios";
import { getAccessToken } from "../utils/helpers";

const baseURL = process.env.REACT_APP_BASE_URL;

export const refreshInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json, text/plain, */*",
  },
});

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json, text/plain, */*",
  },
});

export const uploadInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "multipart/form-data",
    Accept: "application/json, text/plain, */*",
  },
});

const onRequest = (request) => {
  const customer = JSON.parse(localStorage.getItem("customer"));
  const admin = JSON.parse(localStorage.getItem("admin"));
  const client = JSON.parse(localStorage.getItem("client"));
  const operator = JSON.parse(localStorage.getItem("operator"));
  request.headers.Authorization =
    `Bearer ${
      (location.pathname.includes("operator/")
        ? operator
        : location.pathname.includes("admin/")
        ? admin
        : location.pathname.includes("client/")
        ? client
        : customer
      )?.access_token
    }` || "";

  return request;
};

const onRefreshRequest = (request) => {
  const customer = JSON.parse(localStorage.getItem("customer"));
  const admin = JSON.parse(localStorage.getItem("admin"));
  const client = JSON.parse(localStorage.getItem("client"));
  const operator = JSON.parse(localStorage.getItem("operator"));
  request.headers.Authorization =
    `Bearer ${
      (location.pathname.includes("operator/")
        ? operator
        : location.pathname.includes("admin/")
        ? admin
        : location.pathname.includes("client/")
        ? client
        : customer
      )?.refresh_token
    }` || "";

  return request;
};

const onRequestError = (error) => {
  return Promise.reject(error);
};

const onResponse = (response) => {
  return response;
};
const onResponseError = async (error) => {
  const userTypes = ["operator", "admin", "client", "customer"];
  const user = userTypes
    .map((type) =>
      location.pathname.includes(type)
        ? JSON.parse(localStorage.getItem(type))
        : null
    )
    .find((user) => user !== null);

  const statusCode = error.response?.status;
  const originalRequest = error.config;

  if (statusCode === 401 && user) {
    try {
      const { data } = await getAccessToken();
      const newData = { ...user, access_token: data.access_token };

      localStorage.setItem(
        userTypes.find((type) => location.pathname.includes(type)),
        JSON.stringify(newData)
      );

      return axiosInstance(originalRequest);
    } catch (refreshError) {
      console.error("Error refreshing token:", refreshError);
    }
  }

  return Promise.reject(error);
};

axiosInstance.interceptors.request.use(onRequest, onRequestError);
axiosInstance.interceptors.response.use(onResponse, onResponseError);
uploadInstance.interceptors.request.use(onRequest, onRequestError);
uploadInstance.interceptors.response.use(onResponse, onResponseError);

// Add the interceptor for refreshInstance requests
refreshInstance.interceptors.request.use(onRefreshRequest, onRequestError);
refreshInstance.interceptors.response.use(onResponse, onResponseError);
export default axiosInstance;
