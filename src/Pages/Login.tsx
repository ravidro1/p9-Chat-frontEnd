import axios from "axios";
import {useEffect, useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import LoginExistCheck from "../Compionents/LoginExistCheck";

import "../Style/login.css";

interface Props {}

const Login: React.FC<Props> = () => {
  const {checkIfLogin} = LoginExistCheck();

  const navigate = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [errorLine, setErrorLine] = useState<string | undefined>();

  useEffect(() => {
    checkIfLogin();
  }, []);

  const login = () => {
    if (username.length == 0 || password.length == 0) {
      setErrorLine("Both Fields Should Be Filled");
    } else {
      axios
        .post(`${process.env.REACT_APP_EXPRESS_PORT}/Login`, {username, password})
        .then((res) => {
          if (res.data.userAlreadyLogged) {
            setErrorLine("The User Is Already Logged-In");
          } else {
            sessionStorage.setItem("token", JSON.stringify(res.data.token));
            sessionStorage.setItem("id", JSON.stringify(res.data.userID));
            navigate("/Home");
          }
        })
        .catch((err) => {
          console.log(err);
          setErrorLine("Username Or Password incorrect");
        });
    }
  };

  return (
    <div className="main-loginPage">
      <div className="logo-loginPage">
        {" "}
        <img src="RaviChat.png" alt="Chat logo" />{" "}
      </div>

      <div className="form-loginPage">
        <div className="loginWord-LoginPage"> Login </div>
        <div className="inputs-loginPage">
          <input
            className="input-loginPage"
            placeholder="Username"
            onChange={(e) => {
              setUsername(e.target.value.trim());
              setErrorLine(undefined);
            }}
            type={"text"}
          />

          <input
            className="input-loginPage"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value.trim());
              setErrorLine(undefined);
            }}
            type={"password"}
          />
        </div>
        <div className="errorLine-LoginPage">
          {" "}
          {errorLine && <span> {errorLine} </span>}
        </div>
        <div className="loginButton-loginPage" onClick={() => login()}>
          Login
        </div>
        <div
          className="toRegister-LoginPage"
          onClick={() => navigate("/SignUp")}
        >
          {" "}
          Register{" "}
        </div>
      </div>
    </div>
  );
};

export default Login;
