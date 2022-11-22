import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Account from "./components/account/Account";
import Home from "./components/home/Home";

import Nav from "./components/nav/Nav";
import Weather from "./components/weather/Weather";

function App() {
  const [isUser, setIsUser] = useState(false);
  const [category, setCategory] = useState<string>("general");

  return (
    <div>
      <Router>
        <Nav isUser={isUser} setIsUser={setIsUser} setCategory={setCategory} />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home category={category} />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/account" element={<Account setIsUser={setIsUser} />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
