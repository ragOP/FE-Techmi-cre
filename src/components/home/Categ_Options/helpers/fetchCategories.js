import { apiService } from "../../../../utils/api/apiService";
import { endpoints } from "../../../../utils/endpoints";

export const fetchCategories = async ({ params }) => {
  try {
    const apiResponse = await apiService({
      endpoint: endpoints.category,
      method: "GET",
      params,
    });

    if (apiResponse?.response?.success) {
      return apiResponse?.response?.data?.categories;
    }

    return [];
  } catch (error) {
    console.error("error");
  }
};
