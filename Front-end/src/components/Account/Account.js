import React from "react";
import "./styles.scss";
import { Link, useNavigate } from "react-router-dom";
import Header from "../header/header";
import Footer from "../footer/footer";

const Account = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <Header />{" "}
      <div className="Account-details">
        <div className="user-info">
          <div>
            <p>Name:{user.name}</p>
            <p>Email:{user.email}</p>
            <p>Mobile:{user.mobile}</p>
            <p>heardAbout:{user.heardAbout}</p>
            <p>Gender:{user.gender}</p>
            <p>State:{user.state}</p>
          </div>
          <img
            src={`${
              user.image
                ? user.image
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUrgu4a7W_OM8LmAuN7Prk8dzWXm7PVB_FmA&usqp=CAU"
            }`}
            alt="User"
          />
        </div>
        <div className="buttons">
          <Link style={{ textDecoration: "none" }} to={"/"}>
            <button>Home</button>
          </Link>
          <button onClick={() => navigate(-1)}>Go Back</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Account;
