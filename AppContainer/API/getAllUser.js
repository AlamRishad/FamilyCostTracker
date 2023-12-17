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
export const getFamilyMembersByUserId = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/api/FamilyMember/${userId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch family members", error);
  }
};
export const getFamilyMemberDetails = async (familyMemberID) => {
  try {
    let response = await fetch(
      `${BASE_URL}/api/FamilyMember/Details/${familyMemberID}`
    );
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(error);
  }
};

export const getCategoriesByFamilyMember = async (familyMemberID) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/Category/ByFamilyMember/${familyMemberID}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const categories = await response.json();
    return categories;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
