import axios from "axios";
import react, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import LoginExistCheck from "../Compionents/LoginExistCheck";

import "../Style/signUp.css";

interface Props {}

const SignUp: React.FC<Props> = () => {
  const {checkIfLogin} = LoginExistCheck();

  const navigate = useNavigate();

  const [username, setUsername] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const [errorLine, setErrorLine] = useState<string | undefined>();

  useEffect(() => {
    checkIfLogin();
  }, []);

  const signUp = () => {
    axios
      .post("http://localhost:8001/SignUp", {username, password})
      .then((res) => {
        // console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setErrorLine("Username Or Password incorrect");
      });

    setUsername("");
    setPassword("");
  };

  return (
    <div className="main-signUpPage">
      <div className="form-signUpPage">
        <div className="signUpWord-signUpPage"> Register </div>
        <div className="inputs-signUpPage">
          <input
            className="input-signUpPage"
            placeholder="Username"
            onChange={(e) => {
              setUsername(e.target.value.trim());
              setErrorLine(undefined);
            }}
            type={"text"}
          />

          <input
            className="input-signUpPage"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value.trim());
              setErrorLine(undefined);
            }}
            type={"text"}
          />
        </div>
        <div className="errorLine-signUpPage">
          {errorLine && <span> {errorLine} </span>}
        </div>

        <div className="signUpButton-signUpPage" onClick={() => signUp()}>
          SignUp
        </div>

        <div className="toRegister-SignPage" onClick={() => navigate("/")}>
          To Login
        </div>
      </div>
    </div>
  );
};

export default SignUp;
