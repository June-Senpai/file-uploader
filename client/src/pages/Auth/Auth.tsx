import React from "react";
import { ThemedBackground } from "../../component/ThemedBackground";
import "./auth.css";

const Auth = () => {
  return (
    <div className="parent">
      <ThemedBackground />
      <div className="child">
        <div className="google-signin-button">
          <span className="google-signin-button-icon"></span>
          <span
            onClick={() =>
              window.open("http://localhost:4001/google/signin", "_self")
            }
            className="google-signin-button-text"
          >
            Sign in with Google
          </span>
        </div>
      </div>
    </div>
  );
};

export default Auth;
