import { apiService } from "../../..//utils/api/apiService";
import { endpoints } from "../../../utils/endpoints";

export const checkInventory = async ({ productIds }) => {
  try {
    const response = await apiService({
      endpoint: endpoints.inventoryCheck,
      method: "POST",
      data: {
        product_ids: productIds,
      },
    });
    return response.response.data;
  } catch (error) {
    throw error;
  }
}; 