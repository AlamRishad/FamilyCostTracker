import { API_URL } from "./config";

export const addCategory = async (categoryData) => {
  const response = await fetch(`${API_URL}/api/Category`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(categoryData),
  });

  if (!response.ok) {
    throw new Error("Failed to add category");
  }

  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch (error) {
    if (text === "") {
      console.log("Category added, but no details returned from the server.");
      return null;
    } else {
      throw error;
    }
  }
};
