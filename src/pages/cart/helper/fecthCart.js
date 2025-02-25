import { apiService } from "../../..//utils/api/apiService";
import { endpoints } from "../../../utils/endpoints";
import { getItem } from "../../../utils/local_storage";

export const fetchCart = async ({ params }) => {
  try {
    const apiResponse = await apiService({
      endpoint: endpoints.cart,
      method: "GET",
      params,
      token: getItem("token"),
    });

    if (apiResponse?.response?.success) {
      return apiResponse?.response?.data?.data;
    }

    return [];
  } catch (error) {
    console.error("error");
  }
};