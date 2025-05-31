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
    "9fb1a2b7-5ddf-429d-99a9-88ff47b419dd";
  localAxios.defaults.headers.common["x-platform"] = "ios";
  localAxios.defaults.headers.common["x-app-id"] = "com.sbareads";

  // Set token if available
  if (token)
    localAxios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  // Set content type if available
  if (contentType) {
    localAxios.defaults.headers.common["Content-Type"] = contentType;
  }
};
