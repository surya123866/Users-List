import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import "./styles.scss";

const UserDetails = () => {
  const { userId } = useParams();
  const users = useSelector((state) => state.users);
  const user = users.find((eachUser) => eachUser._id === userId);
  return (
    <div className="user-details">
      <h2>User Details</h2>
      <p>Name:{user.name}</p>
      <p>Email:{user.email}</p>
      <p>Mobile:{user.mobile}</p>
      <div className="buttons">
        <Link style={{ textDecoration: "none" }} to={`/edit-user/${user._id}`}>
          <button>Edit Details</button>
        </Link>
        <Link style={{ textDecoration: "none" }} to={"/"}>
          <button>Back</button>
        </Link>
      </div>
    </div>
  );
};

export default UserDetails;
