import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import { useDispatch } from "react-redux";
import { saveUser } from "../../actions/actions";
import "./styles.scss";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [gender, setGender] = useState("");
  const [heardAbout, setHeardAbout] = useState([]);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [password, setPassword] = useState("");
  const [selectedOption, setSelectedOption] = useState("file"); // 'file' or 'capture'
  const [selectedImage, setSelectedImage] = useState(null);
  const webcamRef = useRef(null);
  const [error, setError] = useState("");

  const handleSave = () => {
    setError(""); // Reset error message

    // Validation
    if (!name || !email || !mobile || !gender || !city || !state || !password) {
      setError("Please fill in all the required fields.");
      return;
    }

    dispatch(
      saveUser({
        name,
        email,
        mobile,
        gender,
        heardAbout,
        city,
        state,
        password,
        selectedImage,
      })
    );
    localStorage.setItem(
      "user",
      JSON.stringify({
        name,
        email,
        mobile,
        gender,
        heardAbout,
        city,
        state,
        password,
        selectedImage,
      })
    );
    // Mock signup logic (replace it with actual authentication logic)
    Cookies.set("Token", true);

    // Redirect to the dashboard or any desired page
    navigate("/");
  };

  const handleOptionChange = (option) => {
    setSelectedImage(null); // Reset selected image when changing the option
    setSelectedOption(option);
  };

  const captureImage = () => {
    if (
      webcamRef.current &&
      selectedOption === "capture" &&
      selectedImage === null
    ) {
      const imageSrc = webcamRef.current.getScreenshot();

      if (imageSrc && typeof imageSrc === "string") {
        setSelectedImage(imageSrc);
      } else {
        console.error("Invalid image source:", imageSrc);
      }
    }
  };

  const handleFileChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  return (
    <div className="signup-form">
      <div>
        <div>
          <h1>Set up your Account</h1>
          <p>Rigister with required details</p>
        </div>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value.replace(/[^A-Za-z ]/g, ""))}
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
        <label>
          Gender:
          <div>
            <label>
              <input
                type="radio"
                value="Male"
                checked={gender === "Male"}
                onChange={() => setGender("Male")}
              />
              Male
            </label>

            <label>
              <input
                type="radio"
                value="Female"
                checked={gender === "Female"}
                onChange={() => setGender("Female")}
              />
              Female
            </label>

            <label>
              <input
                type="radio"
                value="Others"
                checked={gender === "Others"}
                onChange={() => setGender("Others")}
              />
              Others
            </label>
          </div>
        </label>
        <label>
          How did you hear about this?
          <div>
            <label>
              <input
                type="checkbox"
                value="LinkedIn"
                checked={heardAbout.includes("LinkedIn")}
                onChange={() =>
                  setHeardAbout((prev) =>
                    prev.includes("LinkedIn")
                      ? prev.filter((item) => item !== "LinkedIn")
                      : [...prev, "LinkedIn"]
                  )
                }
              />
              LinkedIn
            </label>

            <label>
              <input
                type="checkbox"
                value="Friends"
                checked={heardAbout.includes("Friends")}
                onChange={() =>
                  setHeardAbout((prev) =>
                    prev.includes("Friends")
                      ? prev.filter((item) => item !== "Friends")
                      : [...prev, "Friends"]
                  )
                }
              />
              Friends
            </label>

            <label>
              <input
                type="checkbox"
                value="Job Portal"
                checked={heardAbout.includes("Job Portal")}
                onChange={() =>
                  setHeardAbout((prev) =>
                    prev.includes("Job Portal")
                      ? prev.filter((item) => item !== "Job Portal")
                      : [...prev, "Job Portal"]
                  )
                }
              />
              Job Portal
            </label>

            <label>
              <input
                type="checkbox"
                value="Others"
                checked={heardAbout.includes("Others")}
                onChange={() =>
                  setHeardAbout((prev) =>
                    prev.includes("Others")
                      ? prev.filter((item) => item !== "Others")
                      : [...prev, "Others"]
                  )
                }
              />
              Others
            </label>
          </div>
        </label>
        <label>
          City:
          <select value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="">Select City</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Pune">Pune</option>
            <option value="Ahmedabad">Ahmedabad</option>
          </select>
        </label>
        <label>
          State:
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="Type to search"
          />
          {/* You might want to add auto-suggestion logic here */}
        </label>
        <label>
          Password:
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Set the password"
          />
          {/* You might want to add auto-suggestion logic here */}
        </label>

        {error && <div className="error-message">{error}</div>}

        <div className="gallery-container">
          <div className="capture-options">
            <label>
              <input
                type="radio"
                value="file"
                checked={selectedOption === "file"}
                onChange={() => handleOptionChange("file")}
              />
              Choose File
            </label>

            <label>
              <input
                type="radio"
                value="capture"
                checked={selectedOption === "capture"}
                onChange={() => handleOptionChange("capture")}
              />
              Capture Image
            </label>
          </div>

          {selectedOption === "capture" && (
            <div>
              <Webcam height={300} width={300} ref={webcamRef} />
              <button onClick={captureImage}>Capture</button>
            </div>
          )}

          {selectedOption === "file" && (
            <div className="gallery-container">
              <input type="file" name="myImage" onChange={handleFileChange} />
            </div>
          )}

          <button onClick={handleSave}>Save</button>
        </div>
      </div>
      <hr className="horizontal-line" />
      <p>
        Already have an account?{" "}
        <Link to={"/login"}>
          <span>Sign in</span>
        </Link>
      </p>
    </div>
  );
};

export default SignupForm;
