import axios from "axios";

// const baseURL = "https://fakestoreapi.com";
const baseURL = "https://api.escuelajs.co/api/v1";

const createRequest = axios.create({
  baseURL,
});

createRequest.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

createRequest.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default createRequest;
