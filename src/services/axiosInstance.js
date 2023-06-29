import axios from "axios";

const twitterBaseURL = process.env.REACT_APP_X_RAPIDAPI_TWITTER_URL;
const headers = {
  "X-RapidAPI-Key": process.env.REACT_APP_X_RAPIDAPI_KEY,
};

const createInstance = (baseURL) => {
  const instance = axios.create({
    baseURL,
    headers,
  });

  instance.interceptors.request.use(
    (request) => request,
    (error) => Promise.reject(error)
  );
  instance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
  );

  return instance;
};

const twitterInstance = createInstance(twitterBaseURL);

export default twitterInstance;
