import axios from "axios";

export function getApi() {
  const api = axios.create({
    baseURL: "http://localhost:3001/api",
    headers: {
      "Content-Type": "application/json",
    },
  });

  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      console.log("Intercepted token: ", token);

      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
      console.log("Request headers after intercepting: ", config);

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return api;
}