import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Account from "./components/account/Account";
import Home from "./components/home/Home";

import Nav from "./components/nav/Nav";
import RequireAuth from "./components/Protected/RequireAuth";
import WeatherApp from "./components/weather/Weather";

interface context {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>> | null;
  countery: string;
  setCountry: React.Dispatch<React.SetStateAction<string>> | null;
}
export const appContext = createContext<context>({
  isLoading: false,
  setIsLoading: null,
  countery: "",
  setCountry: null,
});

function App() {
  const [isUser, setIsUser] = useState(false);
  const [category, setCategory] = useState<string>("general");

  const [isLoading, setIsLoading] = useState(false);
  const [countery, setCountry] = useState("us");

  return (
    // <div>
    //@ts-ignore
    <appContext.Provider value={{ isLoading, setIsLoading, countery, setCountry }}>
      <Router>
        <Nav isUser={isUser} setIsUser={setIsUser} setCategory={setCategory} />
        <div className="container">
          <Routes>
            <Route element={<RequireAuth isUser={isUser} />}>
              <Route path="/" element={<Home category={category} />} />
            </Route>
            <Route path="/weather" element={<WeatherApp />} />
            <Route path="/account" element={<Account setIsUser={setIsUser} />} />
          </Routes>
        </div>
      </Router>
    </appContext.Provider>
    // </div>
  );
}

export default App;
