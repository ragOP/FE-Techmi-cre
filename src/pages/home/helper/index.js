import { apiService } from "../../..//utils/api/apiService";
import { endpoints } from "../../../utils/endpoints";

export const addHomeConfig = async ({ payload }) => {
  try {
    const apiResponse = await apiService({
      endpoint: endpoints.home,
      method: "GET",
    });
    if(apiResponse?.response?.success){
        return apiResponse?.response?.data;
    }
    return {}
  } catch (error) {
    console.error("error");
  }
};
