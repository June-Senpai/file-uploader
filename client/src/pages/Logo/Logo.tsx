import React from "react";
import { useState, useEffect, FC } from "react";
import "./logo.css";
import { useNavigate } from "react-router-dom";
import { ThemedBackground } from "../../component/ThemedBackground";
import axios from "axios";
export type User = any;
export interface LogoProps {
  setUser: (user: User) => void;
  user: User;
  uuid: string | undefined;
  setuuid: (uuid: string) => void;
  email: string | undefined;
  setemail: (email: string) => void;
}

export const Logo: FC<LogoProps> = ({
  setUser,
  user,
  uuid,
  setuuid,
  email,
  setemail,
}) => {
  const navigate = useNavigate();
  // const queryParameters = new URLSearchParams(window.location.search);
  // const fileUploaderuuid = queryParameters.get("fileuploaderuseremail");
  // const fileUploaderUserEmail = queryParameters.get("fileuploaderuuid");
  // console.log({ fileUploaderUserEmail });
  // console.log({ fileUploaderuuid });

  const [files, setFiles] = useState<any>([]);
  const queryParameters = new URLSearchParams(window.location.search);
  const fileUploaderUserEmail = queryParameters.get("fileUploaderUserEmail");
  const fileUploaderuuid = queryParameters.get("fileUploaderuuid");
  // console.log({ fileUploaderUserEmail });
  // console.log({ fileUploaderuuid });
  // console.log({ uuid, email });

  useEffect(() => {
    const isUserEmtpy = Object.keys(user)?.length < 1;
    if (isUserEmtpy) {
      navigate("/auth");
    } else {
      navigate("/");
    }
  }, [user?._id]);

  useEffect(() => {
    const response = fetch(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/login/status?fileUploaderuuid=${uuid}&fileUploaderUserEmail=${email}`,
      {
        // credentials: "include",
        headers: {
          Authorization: uuid || "",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setUser(data.response);
        setuuid(uuid || "");
        setemail(email || "");

        console.log({ data });

        return data.response;
      })
      .then((user) => {
        // console.log({ user }, "sgkjsdbngkjs");
        fetch(`${import.meta.env.VITE_BACKEND_URL}/file/list`, {
          // credentials: "include",
          headers: {
            Authorization: uuid || "",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setFiles(data.response);
            setuuid(uuid || "");
          });
        // console.log("passed here............");

        navigate("/");
      });
  }, [user?.username]);
  // useEffect(() => {
  //   if (!user && !fileUploaderuuid && !fileUploaderUserEmail) {
  //     navigate("/auth");
  //   }
  //   const response = fetch(
  //     `${
  //       import.meta.env.VITE_BACKEND_URL
  //     }/login/status?fileUploaderuuid=${fileUploaderuuid}&?fileUploaderUserEmail=${fileUploaderUserEmail}`,
  //     {
  //       credentials: "include",
  //     }
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       if (!data.response) {
  //         navigate("/auth");
  //       }
  //       setUser(data.response);

  //       return data.response;
  //     })
  //     .then((user) => {
  //       // console.log({ user });
  //       fetch(`${import.meta.env.VITE_BACKEND_URL}/file/list`, {
  //         credentials: "include",
  //       })
  //         .then((res) => res.json())
  //         .then((data) => setFiles(data.response));
  //       navigate("/");
  //     });
  // }, [user?.username]);
  // console.log({ files });
  return (
    <div className="logo-container">
      <ThemedBackground />
      <ul className="List">
        <p className="center-align">
          <label className="custom-file-upload">
            <input
              onChange={(e) => {
                const file = e.target.files ? e.target.files[0] : new Blob();
                const reader = new FileReader();
                reader.onload = (e) => {
                  const form = new FormData();
                  form.append("file", file);
                  fetch(`${import.meta.env.VITE_BACKEND_URL}/file/upload`, {
                    method: "POST",
                    // credentials: "include",
                    body: form,
                    headers: {
                      Authorization: uuid || "",
                    },
                  })
                    .then((data) => data.json())
                    .then((data) => {
                      setFiles([...files, data.response]);
                    })

                    .catch((error) => console.log(error));
                  // console.log(e.target?.result);
                };
                reader.readAsText(file);
                // console.log(e.target.files);
              }}
              type="file"
            ></input>
            Upload File
          </label>
        </p>
        {files.map((file: any) => {
          return (
            <li key={file._id}>
              <a
                className="file-name"
                href={`${import.meta.env.VITE_BACKEND_URL}/file/${file._id}`}
              >
                {file.fileName.split("_")[1]}
              </a>
              <button
                className="delete-button"
                onClick={() => {
                  fetch(
                    `${import.meta.env.VITE_BACKEND_URL}/file/delete/` +
                      file._id,
                    {
                      // credentials: "include",
                      headers: {
                        Authorization: uuid || "",
                      },
                    }
                  ).then(() =>
                    setFiles(files.filter((item: any) => item._id !== file._id))
                  );
                }}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
