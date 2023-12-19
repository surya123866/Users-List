// NotFound.js
import React from "react";
import "./styles.scss";
import Footer from "../footer/footer";
import Header from "../header/header";

const NotFound = () => {
  return (
    <>
      <Header />
      <div className="not-found-wrapper">
        <div className="not-found-content">
          <h1>404 Not Found</h1>
          <p>
            Sorry, the page you are looking for might be in another universe.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
