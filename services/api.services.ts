import axios from "services/axios.service";
import { call } from "redux-saga/effects";
import { AxiosRequestConfig } from "axios";

interface IAxiosService {
  url: string;
  headers?: AxiosRequestConfig;
}

const axiosService = (config: IAxiosService) => {
  if (process.env.NODE_ENV === "production") {
    console.log = () => {};
  }
  const url = config.url;
  if (!url) {
    throw new Error("Axios: Invalid URL");
  }
  
  if (config.headers) {
    axios.defaults.headers = { ...axios.defaults.headers, ...config.headers };
  }
  return axios;
};

// --- call Get ---

export const callGet = (url: string, params?: any) =>
  call(() =>
    axiosService({ url })
      .get(url, { params: params })
      .then((response) => response)
      .catch((error) => {
        throw error.response?.data || error;
      })
  );

// --- call Get with Header ---

export const callGetWithHeader = (url: string, params?: any, header?: any) =>
  call(() =>
    axiosService({ url, headers: header })
      .get(url, { params: params })
      .then((response) => response)
      .catch((error) => {
        throw error.response?.data || error;
      })
  );

// --- call Post ---

export const callPost = (url: string, data?: any, headers?: any) =>
  call(() =>
    axiosService({ url, headers })
      .post(url, data)
      .then((response) => response.data)
      .catch((error) => {
        throw error.response?.data || error;
      })
  );
// --- call Put ---

export const callPut = (url: string, data?: any, headers?: any) =>
  call(() =>
    axiosService({ url })
      .put(url, data, headers)
      .then((response) => response)
      .catch((error) => {
        throw error.response?.data || error;
      })
  );

// --- call Delete ---
export const callDelete = (url: string) =>
  call(() =>
    axiosService({ url })
      .delete(url)
      .then((response) => response)
      .catch((error) => {
        throw error.response?.data || error;
      })
  );
