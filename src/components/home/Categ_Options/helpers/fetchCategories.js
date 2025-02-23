import { apiService } from "../../../../utils/api/apiService";
import { endpoints } from "../../../../utils/endpoints";

export const fetchCategories = async () => {
  try {
    const apiResponse = await apiService({
      endpoint: endpoints.category,
      method: "GET",
    });

    if (apiResponse?.response?.success) {
      return apiResponse?.response?.data;
    }

    return [];
  } catch (error) {
    console.error("error");
  }
};
