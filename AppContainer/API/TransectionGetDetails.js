import { API_URL } from "./config";

export const fetchTransectionExpenses = async (userId) => {
  try {
    const response = await fetch(
      `${API_URL}/api/Transection/GetTransectionDetails/${userId}`,
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
    //console.log(data);

    return data;
  } catch (error) {
    console.log("There was a problem with the fetch operation:", error);
  }
};
