import axios from "axios";
import react, {useContext, useEffect, useState} from "react";
import ChatWindow from "../Compionents/ChatWindow";
import ContactWindow from "../Compionents/ContactSection";
import CreateRoom from "../Compionents/CreateRoom";
import {
  roomType,
  TypeDataContext,
  TypeFunctionsContext,
  TypeMessage,
} from "../types";
import "../Style/homePage.css";
import NavBar from "../Compionents/NavBar";
import LoginExistCheck from "../Compionents/LoginExistCheck";
import {DataContext} from "../Contexts/DataContextProvider";
import {socket} from "../App";
import {FunctionContext} from "../Contexts/FunctionsContextProvider";

interface Props {}

const HomePage: React.FC<Props> = () => {
  const {
    setAllUserRooms,
    setAllUserMessages,
    allUserRooms,
    typingQueue,
    setTypingQueue,
  } = useContext(DataContext) as TypeDataContext;
  const {joinAllRoomToSocket} = useContext(
    FunctionContext
  ) as TypeFunctionsContext;

  const getAllUserRoom = (id: string) => {
    axios
      .post("http://localhost:8001/GetAllRooms", {id})
      .then((res) => {
        joinAllRoomToSocket(res.data.rooms, socket);
        setAllUserRooms(res.data.rooms);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllUserMessages = (id: string) => {
    axios
      .post("http://localhost:8001/GetAllUserMessages", {id})
      .then((res) => {
        setAllUserMessages(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const {checkIfLogin} = LoginExistCheck();

  useEffect(() => {
    checkIfLogin();

    const id = sessionStorage.getItem("id");
    if (typeof id == "string") {
      getAllUserRoom(JSON.parse(id));
      getAllUserMessages(JSON.parse(id));
    }
  }, []);

  useEffect(() => {
    console.log(typingQueue);
  }, [typingQueue]);

  useEffect(() => {
    socket.on(
      "receive-IsTyping",
      (sender: string, typing: boolean, roomID: string) => {
        setTypingQueue((prev) => {
          const copyOfArray = [...prev];
          const roomIndex = prev?.findIndex((room) => room.roomID == roomID);
          const thisCell = copyOfArray[roomIndex];

          if (typing) {
            if (roomIndex >= 0) {
              if (!thisCell.senders?.includes(sender)) {
                copyOfArray[roomIndex] = {
                  ...thisCell,
                  senders: [...thisCell.senders, sender],
                };
              } else {
                let tempSenders = thisCell.senders;
                tempSenders = tempSenders.filter(
                  (oneSender) => oneSender != sender
                );
                tempSenders.unshift(sender);
                copyOfArray[roomIndex] = {
                  ...thisCell,
                  senders: tempSenders,
                };
              }

            } else {
              copyOfArray.push({roomID: roomID, senders: [sender]});
            }
          } else {
            if (thisCell?.senders?.length > 0) {
              copyOfArray[roomIndex] = {
                ...thisCell,
                senders: thisCell?.senders?.filter(
                  (oneSender) => oneSender != sender
                ),
              };
            }
          }

          return copyOfArray;
        });

        // setAllUserRooms((prev) => {
        //   const roomIndex = prev?.findIndex((room) => room._id == roomID);
        //   const copyOfArray = [...prev];

        //   // console.log(roomIndex);

        //   copyOfArray[roomIndex] = {
        //     ...copyOfArray[roomIndex],
        //     isTyping: {typing, sender},
        //   };
        //   return copyOfArray;
        // });
      }
    );

    return () => {
      socket.off("receive-IsTyping");
    };
  }, []);

  return (
    <div className="main-homePage">
      <div className="upperSection-homePage">
        <NavBar />
      </div>

      {/* <CreateRoom /> */}

      <div className="lowerSection-homePage">
        <div className="lowerSection-leftSide-homePage">
          <ContactWindow />
        </div>
        <div className="lowerSection-rightSide-homePage">
          <ChatWindow />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
