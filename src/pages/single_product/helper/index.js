import { apiService } from "../../..//utils/api/apiService";
import { endpoints } from "../../../utils/endpoints";
import { getItem } from "../../../utils/local_storage";

export const fetchSingleProduct = async ({ id, method = "GET"}) => {
  try {
    const apiResponse = await apiService({
      endpoint: `${endpoints.product_by_id}/${id}`,
      method: method,
      token: getItem("token"),
    });

    if (apiResponse?.response?.success) {
      return apiResponse?.response?.data;
    }

    return [];
  } catch (error) {
    console.error("error");
  }
};