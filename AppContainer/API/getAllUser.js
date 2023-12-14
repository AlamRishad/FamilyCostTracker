const BASE_URL = "http://192.168.2.216:1515";

export const getAllUsers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/GetAllUser`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetching error:", error);
    throw error;
  }
};
