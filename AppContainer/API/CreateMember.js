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

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    let responseText = await response.text();
    return responseText;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
