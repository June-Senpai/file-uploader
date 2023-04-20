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
    const response = fetch("http://localhost:4001/login/status", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUser(data.response);
        return data.response;
      })
      .then((user) => {
        console.log({ user });

        if (user) {
          fetch("http://localhost:4001/file/list", {
            credentials: "include",
          })
            .then((res) => res.json())
            .then((data) => setFiles(data.response));
          navigate("/");
        } else {
          navigate("/auth");
        }
      });

    return () => {};
  }, [user?.username]);
  console.log({ files });
  return (
    <div className="logo-container">
      <ThemedBackground />
      <ul className="List">
        <label htmlFor="">
          Upload File
          <input
            onChange={(e) => {
              const file = e.target.files ? e.target.files[0] : new Blob();
              const reader = new FileReader();
              reader.onload = (e) => {
                const form = new FormData();
                form.append("file", file);
                fetch("http://localhost:4001/file/upload", {
                  method: "POST",
                  credentials: "include",
                  body: form,
                })
                  .then((data) => data.json())
                  .then((data) => {
                    setFiles([...files, data.response]);
                  })

                  .catch((error) => console.log(error));
                console.log(e.target?.result);
              };
              reader.readAsText(file);
              console.log(e.target.files);
            }}
            type="file"
          ></input>
        </label>
        {files.map((file: any) => {
          return (
            <li key={file._id}>
              <a href={`http://localhost:4001/file/${file._id}`}>
                {file.fileName}
              </a>
              <button
                onClick={() => {
                  fetch("http://localhost:4001/file/delete/" + file._id, {
                    credentials: "include",
                  }).then(() =>
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
