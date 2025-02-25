import { isDev } from "../is_dev";

export const BACKEND_URL = isDev()
  ? "http://localhost:8000"
  : "https://techmi-crm-be.onrender.com";
