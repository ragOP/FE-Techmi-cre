import { apiService } from "../../../utils/api/apiService";
import { endpoints } from "../../../utils/endpoints";

export const signupUser = async (payload) => {
  try {
    const apiResponse = await apiService({
      endpoint: endpoints.signup,
      method: "POST",
      data: payload,
    });

    return apiResponse;
  } catch (error) {
    console.log(error);
  }
};
