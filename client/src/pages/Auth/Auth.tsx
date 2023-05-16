import React, { useEffect, FC } from "react";
import { ThemedBackground } from "../../component/ThemedBackground";
import "./auth.css";
import { useNavigate } from "react-router-dom";
import { User, LogoProps } from "../Logo/Logo";

const Auth: FC<LogoProps> = ({ user, setUser }) => {
  const queryParameters = new URLSearchParams(window.location.search);
  const fileUploaderUserEmail = queryParameters.get("fileUploaderUserEmail");
  const fileUploaderuuid = queryParameters.get("fileUploaderuuid");
  const navigate = useNavigate();
  useEffect(() => {
    // "fileUploaderUserEmail=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;fileUploaderuuid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    //hello-world
    // ["hello", "world"]

    const isUserEmtpy = Object.keys(user)?.length < 1;
    if (isUserEmtpy) {
      setUser({});
    }
  }, [user?._id]);

  useEffect(() => {
    const isUserEmtpy = Object.keys(user)?.length < 1;
    console.log({ user, testmessage: "logged in" });
    if (!isUserEmtpy) {
      navigate("/");
    }
  }, [user?._id]);

  useEffect(() => {
    const response = fetch(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/login/status?fileUploaderuuid=${fileUploaderuuid}&?fileUploaderUserEmail=${fileUploaderUserEmail}`,
      {
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setUser(data.response);

        return data.response;
      });
  }, [user?.username]);

  return (
    <div className="parent">
      <ThemedBackground />
      <div className="child">
        <div className="google-signin-button">
          <span className="google-signin-button-icon"></span>
          <span
            onClick={() =>
              window.open(
                `${import.meta.env.VITE_BACKEND_URL}/google/signin`,
                "_self"
              )
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
