import axios from "axios";
import { getItem } from "../local_storage/index.js";
import { BACKEND_URL } from "../url/index.js";

export const apiService = async ({
  endpoint,
  method = "GET",
  data,
  params,
  token: _token,
  headers,
  customUrl,
  removeToken = false,
  signal
}) => {
  try {
    const token = getItem("token");

    const requestObj = {
      url: customUrl 
        ? customUrl 
        : `/api/proxy/${endpoint}`, // 🧠 Route through secure proxy
      method,
      data,
      params,
      signal,
      headers: {
        ...headers,
        "ngrok-skip-browser-warning": "xyz",
        ...(!removeToken && (token || _token)
          ? { Authorization: `Bearer ${_token || token}` }
          : {}),
      }
    };

    const { data: res } = await axios(requestObj);
    return { response: res };
  } catch (error) {
    console.error(error, "backend endpoint error");
    return { success: false, error: true, ...(error || {}) };
  }
};
