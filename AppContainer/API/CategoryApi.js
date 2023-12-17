const BASE_URL = "http://192.168.2.216:1515";

export const addCategory = async (categoryData) => {
  const response = await fetch(`${BASE_URL}/api/Category`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(categoryData),
  });

  if (!response.ok) {
    throw new Error("Failed to add category");
  }

  const text = await response.text(); // Get the response text
  try {
    return JSON.parse(text); // Attempt to parse it as JSON
  } catch (error) {
    if (text === "") {
      // Handle empty response
      console.log("Category added, but no details returned from the server.");
      return null;
    } else {
      throw error; // Re-throw the parsing error
    }
  }
};
