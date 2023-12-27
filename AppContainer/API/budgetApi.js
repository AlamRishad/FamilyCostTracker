import { API_URL } from "./config";
export const fetchAllBudgetDetails = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/api/BudgetDetails/${userId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.error("Fetching error:", error);
    throw error;
  }
};
