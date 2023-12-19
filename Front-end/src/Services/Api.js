const API_URL =
  "https://us-central1-users-list-8ee04.cloudfunctions.net/app/api";

export const fetchUsersFromApi = async () => {
  try {
    const response = await fetch(`${API_URL}/users`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching users from API:", error);
    throw error;
  }
};

export const postUserToApi = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding user to API:", error);
    throw error;
  }
};

export const upDateUserToApi = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/user/update/${userData.userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding user to API:", error);
    throw error;
  }
};

export const deleteUserFromApi = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/users/delete/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error Deleting from API:", error);
    throw error;
  }
};

// Add other API-related functions as needed
