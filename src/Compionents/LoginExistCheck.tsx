import axios from "axios";
import {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {socket} from "../App";
import {DataContext} from "../Contexts/DataContextProvider";
import {FunctionContext} from "../Contexts/FunctionsContextProvider";
import {TypeDataContext, TypeFunctionsContext} from "../types";

const LoginExistCheck = () => {
  const {} = useContext(DataContext) as TypeDataContext;
  const {logout} = useContext(FunctionContext) as TypeFunctionsContext;

  const navigate = useNavigate();

  const checkIfLogin = () => {
    let token = sessionStorage.getItem("token");
    let id = sessionStorage.getItem("id");

    if (typeof token == "string" && typeof id == "string") {
      token = JSON.parse(token);
      id = JSON.parse(id);
    }

    axios
      .post("http://localhost:8001/LoginVerifyAndCheckIfUserAlreadyLogged", {
        id,
        token,
      })
      .then((res) => {
        socket.emit("id", id);

        // console.log(res.data.isAlreadyLogged, 4, 4);
        // if (!res.data.isAlreadyLogged || loggedInNow) {
        //   console.log(1);
        //   navigate("/Home");
        // } else {
        //   logout();
        //   console.log("7");
        // }

        navigate("/Home");
      })
      .catch((err) => {
        console.log(err);
        console.log();

        if (!(window.location.pathname == "/SignUp")) {
          navigate("/");
        }
      });
  };

  return {checkIfLogin};
};

export default LoginExistCheck;
