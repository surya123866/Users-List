let localDatabase = [];

// Fetch users from local storage
export const fetchUsersFromLocalDb = () => {
  const storedData = localStorage.getItem("localDatabase");
  localDatabase = storedData ? JSON.parse(storedData) : [];
  return localDatabase;
};

// Save user to local storage
export const saveUserToLocalDb = (user) => {
  localDatabase.push(user);
  localStorage.setItem("localDatabase", JSON.stringify(localDatabase));
};

// Delete user from local storage
export const deleteUserFromLocalDb = (userId) => {
  localDatabase = localDatabase.filter((user) => user._id !== userId);
  localStorage.setItem("localDatabase", JSON.stringify(localDatabase));
};

// Add other local database functions as needed
