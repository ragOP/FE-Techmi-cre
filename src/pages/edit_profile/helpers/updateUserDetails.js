import { apiService } from "../../..//utils/api/apiService";
import { endpoints } from "../../../utils/endpoints";

export const updateUserDetails = async ({ id, updates }) => {
  try {
    const apiResponse = await apiService({
      method: 'PUT', 
      endpoint: `${endpoints.user}/${id}`,
      data: updates
    });

    if (apiResponse?.response?.success) {
      return apiResponse?.response?.data;
    }

    return {};
  } catch (error) {
    console.error("error");
  }
};
