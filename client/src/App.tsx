import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Logo } from "./pages/Logo/Logo";
import Auth from "./pages/Auth/Auth";
import Navbar from "./component/navbar/navbar";
import { createContext, useContext, useState, useEffect } from "react";
// import CryptoJS from "crypto-js";

type Theme = "dark" | "light";
type ThemeContextType = {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
};
export const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  setTheme: () => {},
});

function App() {
  const queryParameters = new URLSearchParams(window.location.search);
  const fileUploaderUserEmail = queryParameters.get("fileUploaderUserEmail");
  const fileUploaderuuid = queryParameters.get("fileUploaderuuid");

  const [uuid, setUuid] = useState<any>(() =>
    window.localStorage.getItem("uuid")
  );
  const [email, setEmail] = useState<any>(() =>
    window.localStorage.getItem("email")
  );
  const setemail = (email: string) => {
    setEmail(email);
    window.localStorage.setItem("email", email);
  };

  const setuuid = (uuid: string) => {
    setUuid(uuid);
    window.localStorage.setItem("uuid", uuid);
  };

  const [theme, setTheme] = useState<Theme>("light");
  const [user, setUser] = useState<any>({});
  console.log({ user });

  useEffect(() => {
    document.body.className = theme; // add theme value as class name to body element
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={theme}>
        <div className="App">
          <Router>
            <Navbar
              setTheme={setTheme}
              theme={theme}
              user={user}
              setUser={setUser}
              setemail={setemail}
              setuuid={setuuid}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Logo
                    setUser={setUser}
                    user={user}
                    uuid={uuid}
                    setuuid={setuuid}
                    email={email}
                    setemail={setemail}
                  />
                }
              />
              <Route
                path="/auth"
                element={
                  <Auth
                    user={user}
                    setUser={setUser}
                    uuid={uuid}
                    setuuid={setuuid}
                    email={email}
                    setemail={setemail}
                  />
                }
              />
              {/* //!for any unknown route without /random-word */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Router>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
