import { apiService } from "../../..//utils/api/apiService";
import { endpoints } from "../../../utils/endpoints";
import { getItem } from "../../../utils/local_storage";

export const fetchCart = async ({ params, method = "GET", body = {} }) => {
  try {
    const apiResponse = await apiService({
      endpoint: endpoints.cart,
      method: method,
      params,
      token: getItem("token"),
      data: body,
    });

    if (apiResponse?.response?.success) {
      console.log(">>>", apiResponse?.response?.data?.cart?.items)
      return apiResponse?.response?.data?.cart?.items;
    }

    return [];
  } catch (error) {
    console.error("error");
  }
};