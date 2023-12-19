// UserCard.js

import React from "react";
import { Link } from "react-router-dom";
import "./UserCard.scss";

const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <div className="actions">
        <Link to={`/view-details/${user.id}`}>View Details</Link>
        <Link to={`/edit-user/${user.id}`}>Edit User</Link>
        <button onClick={() => handleDelete(user.id)}>Delete User</button>
      </div>
    </div>
  );
};

const handleDelete = (userId) => {
  // Implement delete logic
  // ...
  console.log(`Deleting user with ID: ${userId}`);
};

export default UserCard;
