import { apiService } from "../../..//utils/api/apiService";
import { endpoints } from "../../../utils/endpoints";

export const fetchReviews = async ({params}) => {
  try {
    const apiResponse = await apiService({
      endpoint: endpoints.reviews,
      method: "GET",
      params: params
    });

    if (apiResponse?.response?.success) {
      return apiResponse?.response?.data;
    }

    return [];
  } catch (error) {
    console.error("error");
  }
};