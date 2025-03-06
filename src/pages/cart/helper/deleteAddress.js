import { apiService } from "../../../utils/api/apiService";
import { endpoints } from "../../../utils/endpoints";

export const deleteAddress = async ({ id }) => {
  try {
    const apiResponse = await apiService({
      endpoint: `${endpoints.address}/${id}`,
      method: "DELETE",
    });

    return apiResponse;
  } catch (error) {
    console.error("error");
  }
};
