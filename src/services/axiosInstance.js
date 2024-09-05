import axios from "axios";
import { REFRESH_TOKEN } from "./customer/url";

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
  const analytics = JSON.parse(localStorage.getItem("analytics"));
  const client = JSON.parse(localStorage.getItem("client"));
  const operator = JSON.parse(localStorage.getItem("operator"));
  request.headers.Authorization =
    `Bearer ${
      (location.pathname.includes("operator/")
        ? operator
        : location.pathname.includes("admin/")
        ? admin
        : location.pathname.includes("analytics/")
        ? analytics
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
        : location.pathname.includes("analytics/")
        ? analytics
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

const pathPrefix =
  location.pathname.match(/(operator|admin|analytics|client)\//)?.[0] ||
  "customer";
const newPath = pathPrefix?.replace("/", "");
const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await axiosInstance.get(
      `${`${newPath}` + REFRESH_TOKEN}`,
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );

    const newAccessToken = response.data;

    window.location.reload();
    localStorage.setItem(newPath, JSON.stringify(newAccessToken));
  } catch (error) {
    localStorage.removeItem(newPath);
    setTimeout(() => {
      window.location.href = `${newPath}/auth/login`;
    }, 500);
    throw error;
  }
};

const onResponseError = async (error) => {
  const userTypes = ["operator", "admin", "analytics", "client", "customer"];
  const user = userTypes
    .map((type) =>
      location.pathname.includes(type)
        ? JSON.parse(localStorage.getItem(type))
        : null
    )
    .find((user) => user !== null);
  const statusCode = error.response?.status;
  if (statusCode === 401 && user) {
    refreshAccessToken(user.refresh_token);
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
