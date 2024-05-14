import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

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

const onRequestError = (error) => {
  return Promise.reject(error);
};

const onResponse = (response) => {
  return response;
};

const onResponseError = (error) => {
  const statusCode = error?.response?.status;
  if (statusCode === 401) {
    sessionStorage.clear();
    setTimeout(() => {
      window.location.href = "/login";
    }, 500);
  }
  return Promise.reject(error);
};

// https://axios-http.com/docs/interceptors
axiosInstance.interceptors.request.use(onRequest, onRequestError);
axiosInstance.interceptors.response.use(onResponse, onResponseError);
uploadInstance.interceptors.request.use(onRequest, onRequestError);
uploadInstance.interceptors.response.use(onResponse, onResponseError);

export default axiosInstance;
