import axios from "axios";
import { BACKEND_URL } from "./backendURl";

export const instance = axios.create({
  baseURL: `${BACKEND_URL}/api/v1`,
  timeout: 5000,
});

instance.interceptors.request.use((config) => {

  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;

});

interface propsAPI {
  method: string;
  url: string;
  data?: any;
  headers?: Record<string, string>;
}

export const apiconnector = async ({ method, url, data, headers }: propsAPI) => {
  try {

    const response = await instance({
      method,
      url,
      data,
      headers: headers || {},
    });

    return response.data;
  } catch (error: any) {
    console.error("API Connector Error:", error?.response?.data || error.message);
    throw error?.response?.data || error;
  }
};
