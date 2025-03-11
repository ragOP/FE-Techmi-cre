import { apiService } from "../../../utils/api/apiService";
import { endpoints } from "../../../utils/endpoints";

export const submitQueryForm = async (payload) => {
  try {
    const apiResponse = await apiService({
      endpoint: endpoints.contact,
      method: "POST",
      data: payload,
    });

    return apiResponse;
  } catch (error) {
    console.log(error);
  }
};