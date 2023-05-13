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

async function App() {
  const queryParameters = new URLSearchParams(window.location.search);
  const email = queryParameters.get("fileUploaderUserEmail");
  const unique_id = queryParameters.get("fileUploaderuuid");

  const cookieValue_unique_id = decodeURIComponent(unique_id ? unique_id : "");
  const cookieValue_email = decodeURIComponent(email ? email : "");

  async function generateSignature(
    value: string,
    paraphrase: string = "mosquito"
  ): Promise<string> {
    // Concatenate the value and paraphrase
    const data = value + paraphrase;

    // Convert the data to UTF-8 bytes
    const dataBytes = new TextEncoder().encode(data);

    // Generate the signature using the SubtleCrypto API
    const signatureBuffer = await crypto.subtle.digest("SHA-256", dataBytes);
    const signatureArray = Array.from(new Uint8Array(signatureBuffer));
    const signatureHex = signatureArray
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
    return signatureHex;
  }
  async function setCookiesFromParams() {
    document.cookie = `fileUploaderUserEmail=${cookieValue_email}; signature=${await generateSignature(
      cookieValue_email
    )}; expires=Fri, 31 Dec 9999 23:59:59 UTC; path=/`;
    document.cookie = `fileUploaderuuid=${cookieValue_unique_id}; signature=${await generateSignature(
      cookieValue_unique_id
    )}; expires=Fri, 31 Dec 9999 23:59:59 UTC; path=/`;
  }

  await setCookiesFromParams();
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
