import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SkeletonTheme } from "react-loading-skeleton";
import SignupForm from "./components/signup/signup";
import Dashboard from "./components/dashoboard/dashboard";
import NotFound from "./components/NotFound/NotFound";

import "./App.css";
import LoginForm from "./components/login/login";
import UserDetails from "./components/dashoboard/UserDetails/userDetails";
import Account from "./components/Account/Account";
import AddUser from "./components/dashoboard/addUser/addUser";
import EditUserDetails from "./components/dashoboard/EditUserDetails/EditUserDetails";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/signUp" element={<SignupForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route
              path="/"
              element={<ProtectedRoute Component={Dashboard} />}
            />
            <Route
              path="/user-details/:userId"
              element={<ProtectedRoute Component={UserDetails} />}
            /> 
            <Route
              path="/add-user"
              element={<ProtectedRoute Component={AddUser} />}
            />
            <Route
              path="/edit-user/:userId"
              element={<ProtectedRoute Component={EditUserDetails} />}
            />
            <Route
              path="/account"
              element={<ProtectedRoute Component={Account} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </SkeletonTheme>
  );
};

export default App;
