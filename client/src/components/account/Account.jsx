import { useState } from "react";
import logo from "../../assets/images/news-logo.jpg";
import { useNavigate } from "react-router-dom";
import "./account.css";
import LogIn from "./LogIn";
import Sign from "./Sign";
import UsersAPI from "../../apis/users";

// source api https://newsapi.org/docs/get-started

const Account = ({ setIsUser }) => {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");
  const [isAlreadyUser, setisAlreadyUser] = useState(true);
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    if (target.id === "email") {
      setEmail((p) => target.value);
    } else if (target.id === "password") {
      setPassword((p) => target.value);
    } else if (target.id === "password2") {
      setPassword2((p) => target.value);
    } else if (target.id === "name") {
      setName((p) => target.value);
    } else {
      throw new Error("invalid change");
    }
  };

  const handleSigninLogin = () => {
    setisAlreadyUser((p) => !p);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reqBody = {
      email,
      password,
      fullName: name,
    };
    try {
      setisLoading((p) => true);
      const { data } = await UsersAPI.post(e.target.id, reqBody);

      if (data.length) throw new Error(data[0].msg);
      else if (!data.token) throw new Error("Failed to log in");
      else {
        console.log("user saved in local storage", data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("userName", data.user.fullName);
      }
      setisLoading((p) => false);

      navigate("/");
      setIsUser((p) => true);
    } catch (error) {
      setisLoading((p) => false);
      console.log(error);
      if (error.response) {
        setMessage(error.response.data.error);
      } else {
        setMessage(error.message);
      }
      setTimeout(() => {
        setMessage((p) => "");
      }, 1500);
    }
  };

  return (
    <section id="account">
      <div className="account-left">
        <div className={isLoading ? "blocker" : ""}></div>
        <form action="" className="form">
          {isAlreadyUser ? (
            <LogIn
              email={email}
              password={password}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              handleSigninLogin={handleSigninLogin}
            />
          ) : (
            <Sign
              email={email}
              password={password}
              password2={password2}
              name={name}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              handleSigninLogin={handleSigninLogin}
            />
          )}
          {message ? <div className="messages">{message}</div> : <div className="messages"></div>}
        </form>
      </div>

      <div className={`account-right ${isLoading ? "loader1" : ""}`}>
        <img
          // src="https://media.gettyimages.com/id/1311148884/vector/abstract-globe-background.jpg?s=612x612&w=0&k=20&c=9rVQfrUGNtR5Q0ygmuQ9jviVUfrnYHUHcfiwaH5-WFE="
          src={logo}
          alt="logo big"
        />
      </div>
    </section>
  );
};

export default Account;
