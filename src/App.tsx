import "./App.css";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import {Routes, Route} from "react-router-dom";
import HomePage from "./Pages/HomePage";
import HomePagePhone from "./Phone/HomePage_Phone";
import {io} from "socket.io-client";
import {useEffect, useState, useRef} from "react";

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

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  return (
    <div className="App">
      <DataContextProvider>
        <SizesContextProvider>
          <FunctionsContextProvider>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/SignUp" element={<SignUp />} />
              {windowWidth > 768 ? (
                <Route path="/Home" element={<HomePage />} />
              ) : (
                <Route path="/Home" element={<HomePagePhone />} />
              )}{" "}
            </Routes>
          </FunctionsContextProvider>
        </SizesContextProvider>
      </DataContextProvider>
    </div>
  );
}

export default App;
