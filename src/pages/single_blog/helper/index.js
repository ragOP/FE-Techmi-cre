import { apiService } from "../../../utils/api/apiService";
import { endpoints } from "../../../utils/endpoints";

export const getSingleBlogData = async (id) => {
  try {
    const apiResponse = await apiService({
      endpoint: `${endpoints.blogs}/${id}`,
      method: "GET",
    });

    return apiResponse;
  } catch (error) {
    console.log(error);
  }
};