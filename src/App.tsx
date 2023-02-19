import "./App.css";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import {Routes, Route} from "react-router-dom";
import HomePage from "./Pages/HomePage";
import {io} from "socket.io-client";
import {useEffect} from "react";

import SizesContextProvider from "./Contexts/SizesContextProvider";
import DataContextProvider from "./Contexts/DataContextProvider";
import FunctionsContextProvider from "./Contexts/FunctionsContextProvider";
import SocketHandler from "./Compionents/SocketHandler";

export const socket = io(`${process.env.REACT_APP_SOCKET_PORT}`);

function App() {
  useEffect(() => {
    socket.on("connection", () => {
      console.log("connect");
    });

    return () => {
      socket.off("connection");
    };
  }, []);

  return (
    <div className="App">
      <DataContextProvider>
        <SizesContextProvider>
          <FunctionsContextProvider>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/SignUp" element={<SignUp />} />
              <Route path="/Home" element={<HomePage />} />
            </Routes>
          </FunctionsContextProvider>
        </SizesContextProvider>
      </DataContextProvider>
    </div>
  );
}

export default App;
