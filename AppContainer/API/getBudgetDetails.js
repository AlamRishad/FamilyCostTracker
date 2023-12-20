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
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    if (response.ok) {
      const responseBody = await response.json();
    } else {
      throw new Error("Server responded with an error.");
    }
  } catch (error) {
    if (error.message === "JSON Parse error: Unexpected end of input") {
      return;
    }
    console.error("Budget error:", error);
    throw error;
  }
};

export const createBudgetDetail = async (budgetData) => {
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
    if (error.message === "JSON Parse error: Unexpected end of input") {
      return;
    }
    console.error("Budget error:", error);
    throw error;
  }
};
