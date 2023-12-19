import {
  fetchUsersFromApi,
  postUserToApi,
  upDateUserToApi,
  deleteUserFromApi,
} from "../Services/Api";
import {
  fetchUsersFromLocalDb,
  saveUserToLocalDb,
  deleteUserFromLocalDb,
} from "../Services/localDb";

export const GET_USERS = "GET_USERS";
export const ADD_USER = "ADD_USER";
export const DELETE_USER = "DELETE_USER";
export const SAVE_USER = "SAVE_USER";

export const saveUser = (userData) => {
  localStorage.setItem("user", JSON.stringify(userData));
  return { type: SAVE_USER, payload: userData };
};

export const getUsers = () => async (dispatch) => {
  try {
    // Check if there are records in the local database
    const localDbUsers = fetchUsersFromLocalDb();
    if (localDbUsers.length > 0) {
      dispatch({ type: GET_USERS, payload: localDbUsers });
    } else {
      // If local database is empty, fetch from the API
      const apiUsers = await fetchUsersFromApi();
      dispatch({ type: GET_USERS, payload: apiUsers });
      // Save API data to local database for future use
      apiUsers.forEach((user) => saveUserToLocalDb(user));
    }
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

export const addUser = (userData) => (dispatch) => {
  // Add user to the local database and dispatch action
  saveUserToLocalDb(userData);
  dispatch({ type: ADD_USER, payload: userData });
  postUserToApi(userData);
};
export const updateUser = (updatedUser) => (dispatch) => {
  // Add user to the local database and dispatch action
  saveUserToLocalDb(updatedUser);
  dispatch({ type: ADD_USER, payload: updatedUser });
  upDateUserToApi(updatedUser);
};

export const deleteUser = (userId) => (dispatch) => {
  // Delete user from the local database and dispatch action
  deleteUserFromLocalDb(userId);
  dispatch({ type: DELETE_USER, payload: userId });
  deleteUserFromApi(userId);
};

// Add other actions as needed (edit, view details, etc.)
