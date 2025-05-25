import { apiService } from "../../../../utils/api/apiService";
import { endpoints } from "../../../../utils/endpoints";

export const fetchTestimonials = async () => {
  try {
    const apiResponse = await apiService({
      endpoint: endpoints.testimonals,
      method: "GET",
    });
    if(apiResponse?.response?.success){
        return apiResponse?.response?.data;
    }
    return []
  } catch (error) {
    console.error("error");
  }
};