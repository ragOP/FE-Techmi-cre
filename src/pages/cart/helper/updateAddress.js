import { apiService } from "../../../utils/api/apiService";
import { endpoints } from "../../../utils/endpoints";

export const updateAddress = async ({ id, payload }) => {
  try {
    const apiResponse = await apiService({
      endpoint: `${endpoints.address}/${id}`,
      data: payload,
      method: "PUT",
    });

    return apiResponse;
  } catch (error) {
    console.error("error");
  }
};
