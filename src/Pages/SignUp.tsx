import axios from "axios";
import react, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {socket} from "../App";
import LoginExistCheck from "../Compionents/LoginExistCheck";

import "../Style/signUp.css";

interface Props {}

const SignUp: React.FC<Props> = () => {
  const {checkIfLogin} = LoginExistCheck();

  const navigate = useNavigate();

  const [username, setUsername] = useState<string | number | undefined>("");
  const [password, setPassword] = useState<string | number | undefined>("");
  const [errorLine, setErrorLine] = useState<string | undefined>();

  useEffect(() => {
    checkIfLogin();
  }, []);

  const signUp = () => {
    // axios
    //   .post(`${process.env.REACT_APP_EXPRESS_PORT}/SignUp`, {username, password})
    //   .then((res) => {
    //     // console.log(res);

    //     // socket.emicdt("newUser", )

    //     navigate("/");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     setErrorLine("Both Input Required");
    //   });



    if(String(username).length < 1 || String(password).length < 1){
      setErrorLine("Both Input Required");
    } else {
      socket.emit("signup", username, password, (isAlreadyExist: boolean) => {
        console.log("signup ", username, password);
  
        if(!isAlreadyExist){
          navigate("/");
        } else {
          setErrorLine("User Already Exist");
          setUsername("");
          setPassword("");
        }
  
      });
    }
    


    



  };

  return (
    <div className="main-signUpPage">
      <div className="form-signUpPage">
        <div className="signUpWord-signUpPage"> Register </div>
        <div className="inputs-signUpPage">
          <input
            value={username}
            maxLength={15}
            className="input-signUpPage"
            placeholder="Username"
            onChange={(e) => {
              setUsername(String(e.target.value).trim());
              setErrorLine(undefined);
            }}
            type={"text"}
          />

          <input
            value={password}
            className="input-signUpPage"
            placeholder="Password"
            onChange={(e) => {
              setPassword(String(e.target.value).trim());
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
