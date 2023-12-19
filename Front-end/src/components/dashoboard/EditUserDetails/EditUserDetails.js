import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../../actions/actions";
import "./styles.scss";
import { Link, useParams, useNavigate } from "react-router-dom";
import Header from "../../header/header";
import Footer from "../../footer/footer";

const EditUserDetails = () => {
  const { userId } = useParams();
  const users = useSelector((state) => state.users);
  const user = users.find((eachUser) => eachUser._id === userId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Use optional chaining to safely access user properties
  const userName = user?.name || "";
  const userEmail = user?.email || "";
  const userMobile = user?.mobile || "";

  const [name, setName] = useState(userName);
  const [email, setEmail] = useState(userEmail);
  const [mobile, setMobile] = useState(userMobile);
  const [error, setError] = useState("");

  const handleUpdateUser = () => {
    if (name || email || mobile) {
      const createdAt = new Date();
      const updatedUser = { userId, name, email, mobile, createdAt };
      dispatch(updateUser(updatedUser));
      navigate("/");
    } else {
      setError("All Fields Required");
    }
  };

  return (
    <>
      <Header />
      <div className="Edit-user">
        <h2>Edit Details</h2>
        <div className="inputs-container">
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value.replace(/[^A-Za-z ]/g, ""))
              }
              required
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
              required
            />
          </label>
          <label>
            Mobile:
            <input
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value.replace(/[^0-9]/g, ""))}
              required
            />
          </label>
        </div>
        {error && <p>{error}</p>}
        <div className="buttons">
          <button onClick={handleUpdateUser}>Update</button>
          <Link style={{ textDecoration: "none" }} to={"/"}>
            <button>Cancel</button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EditUserDetails;
