import { apiService } from "../../..//utils/api/apiService";
import { endpoints } from "../../../utils/endpoints";

export const getUserDetails = async ({ id }) => {
  try {
    const apiResponse = await apiService({
      endpoint: `${endpoints.user}/${id}`,
    });

    if (apiResponse?.response?.success) {
      return apiResponse?.response?.data;
    }

    return {};
  } catch (error) {
    console.error("error");
  }
};
