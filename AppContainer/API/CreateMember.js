const API_URL = "http://192.168.2.216:1515";
export const createFamilyMember = async (name, relationship, userId) => {
  console.log(userId);
  try {
    let response = await fetch(`${API_URL}/api/FamilyMember`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Name: name,
        Relationship: relationship,
        UserID: userId,
      }),
    });

    // If the response is not ok, it will throw before reaching the next line
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Use response.text() if the server sends non-JSON responses
    let responseText = await response.text();
    return responseText;
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error so you can catch it in the calling function
  }
};
