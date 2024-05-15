import axios from "axios";
import { REFRESH_TOKEN } from "./staff/url";

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
  const staff = JSON.parse(localStorage.getItem("staff"));
  const admin = JSON.parse(localStorage.getItem("admin"));
  const new_token = JSON.parse(sessionStorage.getItem("new_token"));
  const id = JSON.parse(sessionStorage.getItem("id"));
  if (new_token) {
    request.headers.Authorization = `Bearer ${new_token}` || "";
  } else if (id) {
    request.headers.Authorization = `Bearer ${id?.access_token}` || "";
  } else {
    request.headers.Authorization =
      `Bearer ${
        (location.pathname.includes("admin/") ? admin : staff)?.access_token
      }` || "";
  }
  return request;
};

const onRefreshRequest = (request) => {
  const staff = JSON.parse(localStorage.getItem("staff"));
  const admin = JSON.parse(localStorage.getItem("admin"));
  request.headers.Authorization =
    `Bearer ${
      (location.pathname.includes("admin/") ? admin : staff)?.access_token
    }` || "";

  return request;
};

const onRequestError = (error) => {
  return Promise.reject(error);
};

const onResponse = (response) => {
  return response;
};

const pathPrefix = location.pathname.match(/(admin)\//)?.[0] || "staff";
const newPath = pathPrefix?.replace("/", "");
const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await refreshInstance.get(
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
  const userTypes = ["admin", "staff"];
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

// https://axios-http.com/docs/interceptors
axiosInstance.interceptors.request.use(onRequest, onRequestError);
axiosInstance.interceptors.response.use(onResponse, onResponseError);
uploadInstance.interceptors.request.use(onRequest, onRequestError);
uploadInstance.interceptors.response.use(onResponse, onResponseError);

export default axiosInstance;
