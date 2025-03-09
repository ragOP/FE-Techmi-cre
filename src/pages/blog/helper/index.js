import { apiService } from "../../../utils/api/apiService";
import { endpoints } from "../../../utils/endpoints";

export const getBlogData = async ({params}) => {
  try {
    const apiResponse = await apiService({
      endpoint: endpoints.blogs,
      method: "GET",
      params: params
    });

    return apiResponse;
  } catch (error) {
    console.log(error);
  }
};