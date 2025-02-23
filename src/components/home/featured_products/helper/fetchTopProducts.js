import { apiService } from "../../../../utils/api/apiService";
import { endpoints } from "../../../../utils/endpoints";

export const fetchTopProducts = async () => {
  try {
    const apiResponse = await apiService({
      endpoint: endpoints.product,
      method: "GET",
      params: {
        is_best_seller: true,
      },
    });

    if (apiResponse?.response?.success) {
      return apiResponse?.response?.data;
    }

    return [];
  } catch (error) {
    console.error("error");
  }
};
