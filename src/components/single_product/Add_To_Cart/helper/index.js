import { apiService } from "../../../../utils/api/apiService";
import { endpoints } from "../../../../utils/endpoints";
import { getItem } from "../../../../utils/local_storage";

export const fetchUserDistubtors = async ({ params, method = "GET" }) => {
  try {
    const apiResponse = await apiService({
      endpoint: endpoints.distrubtors,
      method: method,
      params,
      token: getItem("token"),
    });

    if (apiResponse?.response?.success) {
      return apiResponse?.response?.data;
    }

    return [];
  } catch (error) {
    console.error("error");
  }
};