import { API_URL } from "./config";
export const createFamilyMember = async (
  name,
  relationship,
  userId,
  userType
) => {
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
        AccountType: userType,
      }),
    });

    if (response.ok) {
      let responseData = await response.json();
      return responseData;
    } else if (response.status === 400) {
      let errorText = await response.text();
      throw new Error(errorText);
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    // console.error(error);
    throw error;
  }
};

export const fetchFamilyMemberDetails = async (userId, familyMemberName) => {
  try {
    const response = await fetch(
      `${API_URL}/api/FamilyMember/${userId}/${encodeURIComponent(
        familyMemberName
      )}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("Error fetching family member details:", error);
    return { success: false, error: error.message };
  }
};
