import { API_URL } from "./config";

export const getAllUsers = async () => {
  try {
    const response = await fetch(`${API_URL}/GetAllUser`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Fetching error:", error);
    throw error;
  }
};
export const getFamilyMembersByUserId = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/api/FamilyMember/${userId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Failed to fetch family members", error);
  }
};

export const getFamilyMemberDetails = async (familyMemberID) => {
  try {
    let response = await fetch(
      `${API_URL}/api/FamilyMember/Details/${familyMemberID}`
    );
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.log(error);
  }
};

export const getCategoriesByFamilyMember = async (familyMemberID) => {
  try {
    const response = await fetch(
      `${API_URL}/api/Category/ByFamilyMember/${familyMemberID}`,
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
    console.log(error);
    throw error;
  }
};

export const fetchUserDetails = async (userId) => {
  try {
    // console.log(userId + "jire");
    const response = await fetch(`${API_URL}/GetUser/${userId}`);
    //console.log(response);

    if (!response.ok) {
      throw new Error("User not found");
    }

    const user = await response.json();
    console.log("User details:", user);
    return user;
  } catch (error) {
    console.log("Error fetching user:", error);
    throw error;
  }
};
