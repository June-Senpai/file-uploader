import React, { useState, FC } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "./navbar.css";
function getActiveClass(route: any, location: any) {
  // console.log({ route });
  switch (location.pathname) {
    case route:
      return "activeTab";
      break;

    default:
      return "tab";
      break;
  }
}
import ReactSwitch from "react-switch";

type Theme = "light" | "dark";
type User = {
  _id: "64404379d974a29b37c7cd10";
  username: "Keshav Juneja";
  email: "keshav01juneja@gmail.com";
  unique_id: "4c4c9307-ac41-44ac-9bc2-7f54c38fb409";
  loggedInState: true;
  createdAt: "2023-04-19T19:39:37.902Z";
  updatedAt: "2023-04-20T17:56:40.673Z";
  __v: 0;
};
interface NavbarProps {
  setTheme: (theme: Theme) => void;
  theme: Theme;
  user: User;
}

const Navbar: FC<NavbarProps> = ({ setTheme, theme, user }) => {
  const toggleTheme = () => {
    if (theme === "light") {
      document.documentElement.style.setProperty("--color1", "black");
      document.documentElement.style.setProperty("--color2", "teal");
      document.documentElement.style.setProperty("--color3", "white");
      document.documentElement.style.setProperty("--direction", "45deg");
      document.documentElement.style.setProperty("--search-bg-color", "black");
      document.documentElement.style.setProperty(
        "--search-text-color",
        "white"
      );
      setTheme("dark");
    } else {
      document.documentElement.style.setProperty("--color1", "white");
      document.documentElement.style.setProperty("--color2", "green");
      document.documentElement.style.setProperty("--color3", "teal");
      document.documentElement.style.setProperty("--direction", "0deg");
      document.documentElement.style.setProperty("--search-bg-color", "white");
      document.documentElement.style.setProperty(
        "--search-text-color",
        "black"
      );
      setTheme("light");
    }
  };
  const navigate = useNavigate();
  const location = useLocation();
  const [showLinks, setShowLinks] = useState(false);
  return (
    <div>
      <div className={theme}>
        <div className="navbar">
          <div
            className="left-side-navbar"
            // id={showLinks ? "hidden" : ""}
            // <button className="🍔">Open</button>
          >
            <button
              className="sidebutton"
              onClick={() => setShowLinks(!showLinks)}
            >
              {showLinks ? (
                <img
                  src="https://cdn1.iconfinder.com/data/icons/blobby-iconset/100/Close_with_circle-512.png"
                  alt="menu icon"
                  width={50}
                />
              ) : (
                <img
                  src="https://cdn3.iconfinder.com/data/icons/social-messaging-ui-color-line/254000/30-512.png"
                  alt="menu icon"
                  width={50}
                />
              )}
            </button>
            <div className="link-container" id={showLinks ? "hidden" : ""}>
              <NavLink className={getActiveClass("/", location)} to="/">
                Home
              </NavLink>
            </div>
          </div>

          <div className="link-container" id={showLinks ? "hidden" : ""}>
            <div className="right-side-navbar" id={showLinks ? "hidden" : ""}>
              {!user ? (
                <NavLink
                  className={getActiveClass("/auth", location)}
                  to="/auth"
                >
                  Login/Register
                </NavLink>
              ) : (
                <button>LogOut {user.username}</button>
              )}
            </div>
          </div>
          {/* <button className="toggle-theme-button" onClick={toggleTheme}>
            Toggle Theme
          </button> */}

          <div className="toggle-theme-button">
            <ReactSwitch
              checked={theme === "dark"}
              onChange={toggleTheme}
              uncheckedIcon={<div>☀️</div>}
              checkedIcon={<div>🌙</div>}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
