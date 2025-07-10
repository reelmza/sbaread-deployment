import axios from "axios";

// Instance
export const localAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APIURL,
  timeout: 25_000,
  withCredentials: true,
});

export const attachHeaders = (token: string | null, contentType?: string) => {
  // Set default headers
  localAxios.defaults.headers.common["x-app-version"] = "0.0.1";
  localAxios.defaults.headers.common["x-device-id"] =
    "6f0fce80-13ee-42d7-96bf-59a42ee6e39e";
  localAxios.defaults.headers.common["x-platform"] = "ios";
  localAxios.defaults.headers.common["x-app-id"] = "com.sbareads";
  // localAxios.defaults.headers.common["x-allow-guest-access"] =
  //   "b8a9e5e2-7c3a-4f8b-9c2d-2f3e6a1b4c5d";

  // Set token if available
  if (token)
    localAxios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  // Set content type if available
  if (contentType) {
    localAxios.defaults.headers.common["Content-Type"] = contentType;
  }
};
