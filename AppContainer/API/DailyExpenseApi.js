const BASE_URL = "http://192.168.2.216:1515";

export const fetchDailyExpenses = async (userId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/DailyExpenses/GetDailyExpenses/${userId}`,
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
    console.error("There was a problem with the fetch operation:", error);
  }
};
