import React, { useEffect, FC } from "react";
import { ThemedBackground } from "../../component/ThemedBackground";
import "./auth.css";
import { useNavigate } from "react-router-dom";
import { User, LogoProps } from "../Logo/Logo";

const Auth: FC<LogoProps> = ({
  user,
  setUser,
  email,
  setuuid,
  setemail,
  uuid,
}) => {
  const queryParameters = new URLSearchParams(window.location.search);
  const fileUploaderUserEmail = queryParameters.get("fileUploaderUserEmail");
  const fileUploaderuuid = queryParameters.get("fileUploaderuuid");
  console.log({ fileUploaderuuid, fileUploaderUserEmail, email, uuid });
  console.log({
    locationTo: window.location.search,
    location: window.location,
  });

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
    // console.log({ user, testmessage: "logged in" });
    if (!isUserEmtpy) {
      navigate("/");
    }
  }, [user?._id]);

  useEffect(() => {
    // console.log("test");

    const response = fetch(
      `${import.meta.env.VITE_BACKEND_URL}/login/status?fileUploaderuuid=${
        fileUploaderuuid || uuid
      }&fileUploaderUserEmail=${fileUploaderUserEmail || email}`
      // {
      //   credentials: "include",
      // }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log({ data });

        setUser(data.response);
        setuuid(fileUploaderuuid || uuid || "");
        setemail(fileUploaderUserEmail || email || "");
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
