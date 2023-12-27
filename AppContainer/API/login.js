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
    //console.error("Registration error:", error);
    throw error;
  }
};

export const forgotPassword = async (username, email, newPassword) => {
  try {
    const response = await fetch(`${BASE_URL}/forgotpassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        newPassword,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, data };
    } else {
      return {
        success: false,
        message: data.message || "Failed to change the password",
      };
    }
  } catch (error) {
    return { success: false, message: error.toString() };
  }
};

export const updateUsername = async (userId, newUsername, newPasswordHash) => {
  console.log(userId + " " + newUsername + " " + newPasswordHash);
  try {
    const response = await fetch(
      `${BASE_URL}/UpdateUsername/${userId}?newPasswordHash=${newPasswordHash}&newUsername=${newUsername}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UserId: userId,
          PasswordHash: newPasswordHash,
          Username: newUsername,
        }),
      }
    );

    if (response.ok) {
      const message = await response.text();
      return { success: true, message };
    } else {
      const errorData = await response.text();
      return {
        success: false,
        message: errorData || "Failed to update the username",
      };
    }
  } catch (error) {
    return { success: false, message: error.toString() };
  }
};

export const updateEmail = async (userId, newEmail, newPasswordHash) => {
  console.log(userId + " " + newEmail + " " + newPasswordHash);
  try {
    const response = await fetch(
      `${BASE_URL}/UpdateUserEmail/${userId}?newPasswordHash=${newPasswordHash}&newEmail=${newEmail}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UserId: userId,
          PasswordHash: newPasswordHash,
          newEmail: newEmail,
        }),
      }
    );

    if (response.ok) {
      const message = await response.text();
      return { success: true, message };
    } else {
      const errorData = await response.text();
      return {
        success: false,
        message: errorData || "Failed to update the username",
      };
    }
  } catch (error) {
    return { success: false, message: error.toString() };
  }
};

export const updatePassword = async (
  userId,
  oldPasswordHash,
  newPasswordHash
) => {
  console.log(userId + " " + oldPasswordHash + " " + newPasswordHash);
  try {
    const response = await fetch(
      `${BASE_URL}/UpdateUserPassword/${userId}?oldPasswordHash=${oldPasswordHash}&newPasswordHash=${newPasswordHash}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UserId: userId,
          oldPasswordHash: oldPasswordHash,
          newPasswordHash: newPasswordHash,
        }),
      }
    );

    if (response.ok) {
      const message = await response.text();
      return { success: true, message };
    } else {
      const errorData = await response.text();
      return {
        success: false,
        message: errorData || "Failed to update the username",
      };
    }
  } catch (error) {
    return { success: false, message: error.toString() };
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/DeleteUser/${userId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete the user: " + response.statusText);
    }

    return await response.text();
  } catch (error) {
    console.error("Error during user deletion:", error);
    throw error;
  }
};
