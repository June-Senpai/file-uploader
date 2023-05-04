import React from "react";
import { useState, useEffect, FC } from "react";
import "./logo.css";
import { useNavigate } from "react-router-dom";
import { ThemedBackground } from "../../component/ThemedBackground";
import axios from "axios";
type User = any;
interface LogoProps {
  setUser: (user: User) => void;
  user: User;
}
export const Logo: FC<LogoProps> = ({ setUser, user }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  });
  const [files, setFiles] = useState<any>([]);
  useEffect(() => {
    const response = fetch(`${import.meta.env.BACKEND_URL}login/status`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setUser(data.response);
        return data.response;
      })
      .then((user) => {
        // console.log({ user });

        fetch(`${import.meta.env.BACKEND_URL}file/list`, {
          credentials: "include",
        })
          .then((res) => res.json())
          .then((data) => setFiles(data.response));
        navigate("/");
      });

    return () => {};
  }, [user?.username]);
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
                  fetch(`${import.meta.env.BACKEND_URL}file/upload`, {
                    method: "POST",
                    credentials: "include",
                    body: form,
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
                href={`${import.meta.env.BACKEND_URL}/file/${file._id}`}
              >
                {file.fileName.split("_")[1]}
              </a>
              <button
                className="delete-button"
                onClick={() => {
                  fetch(
                    `${import.meta.env.BACKEND_URL}file/delete/` + file._id,
                    {
                      credentials: "include",
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
