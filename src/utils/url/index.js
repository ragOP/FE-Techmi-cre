import { isDev } from "../is_dev";

export const BACKEND_URL = isDev()
  ? "http://84.247.129.99:8000"
  : "http://84.247.129.99:8000";
