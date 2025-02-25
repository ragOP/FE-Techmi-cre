import { apiService } from "../../../../utils/api/apiService";
import { endpoints } from "../../../../utils/endpoints";

export const fetchProducts = async ({ params }) => {
  try {
    const apiResponse = await apiService({
      endpoint: endpoints.product,
      method: "GET",
      params: params,
    });

    if (apiResponse?.response?.success) {
      return apiResponse?.response?.data?.data;
    }

    return [];
  } catch (error) {
    console.error(error);
  }
};
