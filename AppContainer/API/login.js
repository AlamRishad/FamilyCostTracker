// api.js

const BASE_URL = "http://192.168.2.216:1515";

export const login = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/Login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        passwordHash: password,
      }),
    });

    const responseBody = await response.json(); // Now this should work as expected
    if (response.ok) {
      // Extract userId from the JSON response
      const userId = responseBody.userId;
      return { success: true, body: responseBody, userId: userId };
    } else {
      // Error messages are also sent as JSON now
      return { success: false, message: responseBody.message };
    }
  } catch (error) {
    console.error("Error:", error);
    return {
      success: false,
      message: "An error occurred. Please try again later.",
    };
  }
};
export const registerUser = async (userData) => {
  try {
    console.log(userData);
    const response = await fetch(`${BASE_URL}/CreateUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};
