import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../../actions/actions";
import "./styles.scss";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../footer/footer";
import Header from "../../header/header";

const AddUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");

  const handleSaveUser = () => {
    // Basic validation
    if (!name || !email || !mobile) {
      setError("All fields are required");
      return;
    }

    const createdAt = new Date();
    const newUser = { name, email, mobile, createdAt };
    dispatch(addUser(newUser));
    navigate("/");
  };

  return (
    <>
      <Header />
      <div className="add-user">
        <h2>Add User</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="inputs-container">
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value.replace(/[^A-Za-z ]/g, ""))
              }
              placeholder="Name"
            />
          </label>
          <label>
            Email:
            <input
              type="text"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value.replace(/[^A-Za-z0-9@.]/g, ""))
              }
              placeholder="Email"
            />
          </label>
          <label>
            Mobile:
            <input
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value.replace(/[^0-9]/g, ""))}
              placeholder="Mobile"
            />
          </label>
        </div>
        <div className="buttons">
          <button onClick={handleSaveUser}>Save</button>
          <Link style={{ textDecoration: "none" }} to={"/"}>
            <button>Cancel</button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddUser;
