const API_BASE_URL = "http://192.168.2.216:1515";

export const updateBudgetDetails = async (budgetId, budgetData) => {
  console.log("Updating budget with data:", JSON.stringify(budgetData));
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(budgetData),
  };

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/Budget/${budgetId}`,
      requestOptions
    );
    // const responseBody = await response.j();
    // console.log("Updating budget with data:", JSON.stringify(responseBody));
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Budget error:", error);
    throw error;
  }
};

export const createBudgetDetail = async (budgetData) => {
  //   console.log("Request data: ", JSON.stringify(budgetData));
  try {
    const response = await fetch(`${API_BASE_URL}/api/Budget`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(budgetData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseBody = await response.json();
    console.log("Raw response: ", responseBody);

    return responseBody;
  } catch (error) {
    console.error("Budget error:", error);
    throw error;
  }
};
