import { apiService } from "../../../utils/api/apiService";
import { endpoints } from "../../../utils/endpoints";

export const loginUser = async (payload) => {
  try {
    const apiResponse = await apiService({
      endpoint: endpoints.login,
      method: "POST",
      data: payload,
    });
    return apiResponse;
  } catch (error) {
    console.error(error);
  }
};
