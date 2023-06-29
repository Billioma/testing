import axios from "axios";

const twitterBaseURL = "https://twitter135.p.rapidapi.com/v1.1/";
const headers = {
  "X-RapidAPI-Key": "1f847bd4fbmsh94e4fd2e2359818p16211ajsnc8a86ff1ef11",
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
