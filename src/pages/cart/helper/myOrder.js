import { apiService } from "../../..//utils/api/apiService";
import { endpoints } from "../../../utils/endpoints";
import { getItem } from "../../../utils/local_storage";

export const fetchOrder = async ({ params, method = "GET", body = {} }) => {
  try {
    const apiResponse = await apiService({
      endpoint: endpoints.ordermy,
      method: method,

      token: getItem("token"),
      data: body,
    });

    if (apiResponse?.response?.success) {
      return apiResponse?.response;
    }

    return [];
  } catch (error) {
    console.error("error");
  }
};
