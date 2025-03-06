import { apiService } from "../../..//utils/api/apiService";
import { endpoints } from "../../../utils/endpoints";

export const getAddresses = async ({ id }) => {
  try {
    const apiResponse = await apiService({
      endpoint: `${endpoints.address}/user/${id}`,
    });

    if (apiResponse?.response?.success) {
      return apiResponse?.response?.data;
    }

    return [];
  } catch (error) {
    console.error("error");
  }
};
