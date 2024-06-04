import axiosInstance from "../../axiosInstance";
import * as API from "../url";

export const createScheduleByLocation = async (body) => {
  const response = await axiosInstance.post(
    API.ADMIN_CREATE_SCHEDULE_BY_LOCATION,
    body
  );
  return response.data;
};

export const createScheduleByStaff = async (body) => {
  const response = await axiosInstance.post(
    API.ADMIN_CREATE_SCHEDULE_BY_STAFF,
    body
  );
  return response.data;
};

export const getSchedules = async (page, limit, search) => {
  const response = await axiosInstance.get(
    API.GET_SCHEDULES +
      `?page=${page}&limit=${limit}&${`search=${search}` || ""}`
  );
  return response.data;
};

export const getScheduleDay = async (query) => {
  const response = await axiosInstance.get(
    API.GET_SCHEDULES_DAY(
      query.week,
      query.day,
      query.page,
      query.limit,
      query.search
    )
  );
  return response.data;
};
