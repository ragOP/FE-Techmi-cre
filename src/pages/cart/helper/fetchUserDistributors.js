import { apiService } from "../../../utils/api/apiService";
import { endpoints } from "../../../utils/endpoints";

export const fetchUserDistributors = async ({ params }) => {
  try {
    const apiResponse = await apiService({
      endpoint: endpoints.distributors,
      params,
    });

    return apiResponse;
  } catch (error) {
    console.error("error");
  }
};
