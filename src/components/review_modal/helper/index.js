import { toast } from "react-toastify";
import { apiService } from "../../../utils/api/apiService";
import { endpoints } from "../../../utils/endpoints";

export const postReviews = async ({ params, method, body }) => {
  try {
    const apiResponse = await apiService({
      endpoint: endpoints.reviews,
      method,
      params,
      data: body,
    });

    if (apiResponse?.response?.success) {
      return apiResponse?.response?.data;
    }else{
        toast.error(apiResponse?.response?.data?.message)
    }
    return [];
  } catch (error) {
    console.error("Error in postReviews:", error);
    throw error;
  }
};
