import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import UseGetHook from "../../hooks/useAuth";
import "./nav.css";
const Nav: React.FC<any> = ({ setIsUser, isUser, setCategory }) => {
  const [userName, setUserName] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("userName");
    const token = localStorage.getItem("token");
    if (user && token) {
      setUserName((p) => user);
      setToken((p) => token);
    }
  }, [isUser, token]);

  const handleLogOut = () => {
    setToken(() => "");
    setIsUser(() => false);
    setUserName(() => "");
    UseGetHook("/logout");
    localStorage.clear();
    navigate("/account");
  };

  const handleCategoryClicked = (e: any) => {
    console.log(e.target.id);
    setCategory(() => e.target.id);
  };

  return (
    <>
      <nav>
        <div id="nav-primary">
          <div className="nav-logo-user-container">
            <span>logo</span>
            <span style={{ color: "yellow" }}>Welcome {isUser ? userName : "Guest"}</span>
          </div>

          <div id="search-navbar">
            <input type="text" placeholder="Search..." />
          </div>
          <ul>
            <li>
              <NavLink to="/" aria-activedescendant="active">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/weather" aria-activedescendant="active">
                Weather
              </NavLink>
            </li>
            {!isUser ? (
              <li>
                <NavLink to="/account" aria-activedescendant="active">
                  Log in
                </NavLink>
              </li>
            ) : (
              <li>
                <span className="btn" onClick={handleLogOut}>
                  Log Out
                </span>
              </li>
            )}
          </ul>
        </div>
      </nav>
      <div id="nav-secondary">
        <ul>
          <li className="btn" onClick={handleCategoryClicked} id="general">
            General
          </li>
          <li className="btn" onClick={handleCategoryClicked} id="business">
            Business
          </li>
          <li className="btn" onClick={handleCategoryClicked} id="entertainment">
            Entertainment
          </li>
          <li className="btn" onClick={handleCategoryClicked} id="health">
            Health
          </li>
          <li className="btn" onClick={handleCategoryClicked} id="science">
            Science
          </li>
          <li className="btn" onClick={handleCategoryClicked} id="sports">
            Sports
          </li>
          <li className="btn" onClick={handleCategoryClicked} id="technology">
            Technology
          </li>
        </ul>
      </div>
    </>
  );
};

export default Nav;
