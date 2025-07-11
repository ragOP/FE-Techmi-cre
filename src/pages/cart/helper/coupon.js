import { apiService } from "../../..//utils/api/apiService";
import { endpoints } from "../../../utils/endpoints";

export const getAllCoupons = async ({ params }) => {
  try {
    const apiResponse = await apiService({
      endpoint: endpoints.coupon,
      params: params,
      method: "GET",
    });

    return apiResponse;
  } catch (error) {
    console.error("error");
  }
};
