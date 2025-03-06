import { apiService } from "../../..//utils/api/apiService";
import { endpoints } from "../../../utils/endpoints";

export const addAddress = async ({ payload }) => {
  try {
    const apiResponse = await apiService({
      endpoint: endpoints.address,
      method: "POST",
      data: payload,
    });

    return apiResponse;
  } catch (error) {
    console.error("error");
  }
};
