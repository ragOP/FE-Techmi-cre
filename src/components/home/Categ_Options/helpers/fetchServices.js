import { apiService } from "../../../../utils/api/apiService";
import { endpoints } from "../../../../utils/endpoints";

export const fetchServices = async () => {
  try {
    const apiResponse = await apiService({
      endpoint: endpoints.service,
      method: "GET",
    });

    if (apiResponse?.response?.success) {
      return apiResponse?.response?.data;
    }

    return [];
  } catch (error) {
    console.error(error);
  }
};
