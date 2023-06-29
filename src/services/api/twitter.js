import twitterInstance from "../axiosInstance";
import * as API from "../url";

export const getUser = async () => {
  const res = await twitterInstance.get(API.GET_USER);
  return res.data;
};

export const getTweets = async () => {
  const res = await twitterInstance.get(API.GET_TWEETS);
  return res.data;
};
