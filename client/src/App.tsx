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

  const [theme, setTheme] = useState<Theme>("light");
  const [user, setUser] = useState<any>();

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
            />
            <Routes>
              <Route
                path="/"
                element={<Logo setUser={setUser} user={user} />}
              />
              <Route path="/auth" element={<Auth />} />
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
