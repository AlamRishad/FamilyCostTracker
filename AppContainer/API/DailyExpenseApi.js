import { API_URL } from "./config";

export const fetchDailyExpenses = async (userId) => {
  try {
    const response = await fetch(
      `${API_URL}/api/DailyExpenses/GetDailyExpenses2/${userId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    console.log("There was a problem with the fetch operation:", error);
  }
};

export const fetchDailyExpensesByMember = async (userId, familyMemberID) => {
  try {
    const response = await fetch(
      `${API_URL}/api/DailyExpenses/GetByUserAndFamilyMember2/${userId}/${familyMemberID}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    console.log("There was a problem with the fetch operation:", error);
  }
};
