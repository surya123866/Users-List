// Header.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles.scss";
import Cookies from "js-cookie";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogOut = () => {
    navigate("/login");
    Cookies.remove("Token");
  };
  return (
    <div className="header">
      <div className="brand">
        <h2>User List</h2>
      </div>
      <div className="navigation">
        <button onClick={() => navigate("/")}>Home</button>
        <button onClick={() => navigate("/")}>Dashboard</button>
        <button onClick={() => navigate("/account")}>Account</button>
      </div>
      <div className="user-profile">
        <Link to={"/account"} className="link">
          <img
            src={`${
              false
                ? user.image
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUrgu4a7W_OM8LmAuN7Prk8dzWXm7PVB_FmA&usqp=CAU"
            }`}
            alt="User"
          />
        </Link>
        <h3 className="profile-name">{user.name}</h3>
        <div className="login-logout">
          <button onClick={handleLogOut}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
