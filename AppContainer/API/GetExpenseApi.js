const API_URL = "http://192.168.2.216:1515";

//HttpGet
export const fetchAllExpenseDetails = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/api/ExpenseDetails/${userId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    if (error.message === "HTTP error! status: 500") {
      return;
    }
    console.error("Fetching error:", error);
    throw error;
  }
};

// HttpPost

export const createExpenseDetail = async (budgetData) => {
  try {
    const response = await fetch(`${API_URL}/api/Expenses`, {
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
    // console.error("Budget error:", error);
    throw error;
  }
};

//HttpUpdate
export const updateExpense = async (expenseID, expenseToUpdate) => {
  console.log(expenseID + "expense id ");
  try {
    const response = await fetch(`${API_URL}/api/Expenses/${expenseID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expenseToUpdate),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Could not update the expense", error);
    throw error;
  }
};
