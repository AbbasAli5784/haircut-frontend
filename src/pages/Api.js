import axios from "axios";

export function getApi() {
  const api = axios.create({
    baseURL: "https://meencutz-8dba2b67ac9e.herokuapp.com/api",
    headers: {
      "Content-Type": "application/json",
    },
  });

  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");

      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return api;
}
