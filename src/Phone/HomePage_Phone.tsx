import axios from "axios";
import react, {useContext, useEffect, useState} from "react";
import ChatWindow from "../Compionents/ChatWindow";
import ContactWindow from "../Compionents/ContactSection";
import {
  roomType,
  TypeDataContext,
  TypeFunctionsContext,
  TypeMessage,
} from "../types";
import LoginExistCheck from "../Compionents/LoginExistCheck";
import {DataContext} from "../Contexts/DataContextProvider";
import {socket} from "../App";
import {FunctionContext} from "../Contexts/FunctionsContextProvider";

import "./homePage_phone.css";
import ContactWindow_Phone from "./ContactSection_Phone";
import ChatWindow_Phone from "./ChatWindow_Phone";
import NavBar_Phone from "./NavBar_Phone";

interface Props {}

const HomePage_Phone: React.FC<Props> = () => {
  const {
    setAllUserRooms,
    idAndToken,
    currentRoom,
    setAllUserMessages,
    setTypingQueue,
    setUsersList,
  } = useContext(DataContext) as TypeDataContext;

  const {getAllUserRoom, joinSingelRoomToSocket, getAllUserMessages} =
    useContext(FunctionContext) as TypeFunctionsContext;

  const {checkIfLogin} = LoginExistCheck();

  useEffect(() => {
    checkIfLogin();

    const id = sessionStorage.getItem("id");
    if (typeof id == "string") {
      getAllUserRoom(JSON.parse(id), socket);
      getAllUserMessages(JSON.parse(id));
    }
  }, []);

  const [messageRecive, setMessageRecive] = useState<TypeMessage>();

  useEffect(() => {
    setAllUserRooms((prev) => {
      let roomIndex = prev.findIndex((item) => item._id == messageRecive?.room);
      const copyOfArray = [...prev];

      if (
        copyOfArray[roomIndex] &&
        currentRoom?._id != copyOfArray[roomIndex]._id
      ) {
        copyOfArray[roomIndex] = {
          ...copyOfArray[roomIndex],
          numberOfUnreadMessages: copyOfArray[roomIndex].numberOfUnreadMessages
            ? Number(copyOfArray[roomIndex]?.numberOfUnreadMessages) + 1
            : 1,
        };
      } else if (currentRoom?._id == copyOfArray[roomIndex]?._id) {
        axios
          .post(`${process.env.REACT_APP_EXPRESS_PORT}/UpdateUnreadMessage`, {
            id: idAndToken?.id,
            roomID: currentRoom?._id,
            newUnreadMessagesNumber: 0,
          })
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err));
      }

      return copyOfArray;
    });
  }, [messageRecive]);

  useEffect(() => {
    socket.on("recive-message", (recive: TypeMessage) => {
      setAllUserMessages((prev: TypeMessage[]): TypeMessage[] => [
        ...prev,
        recive,
      ]);

      setAllUserRooms((prev) => {
        const messageRoomIndex = prev.findIndex(
          (item) => item._id == recive.room
        );

        const copyOfArray = [...prev];
        copyOfArray[messageRoomIndex].lastTimeActive = new Date();
        return copyOfArray;
      });

      setMessageRecive(recive);
    });

    socket.on("receive-signup", (user) => {
      setUsersList((prev) => [...prev, user]);
    });

    return () => {
      socket.off("recive-message");
      socket.off("receive-signup");
    };
  }, []);

  useEffect(() => {
    socket.on("recive-newRoom", (receive: roomType) => {
      console.log(receive);
      if (receive._id) joinSingelRoomToSocket(receive._id, socket);
      console.log("dsaassa");

      setAllUserRooms((prev: roomType[]): roomType[] => [...prev, receive]);
    });
    return () => {
      socket.off("recive-newRoom");
    };
  }, []);

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
      }
    );

    return () => {
      socket.off("receive-IsTyping");
    };
  }, []);

  const [isShowChat, setIsShowChat] = useState<boolean>(false);

  return (
    <div className="main-homePage">
      {currentRoom ? (
        <div className="chatPage-homePagePhone">
          <ChatWindow_Phone />
        </div>
      ) : (
        <div className="contactPage-homePagePhone">
          <div className="navBar-homePagePhone">
            <NavBar_Phone />
          </div>
          <ContactWindow_Phone />
        </div>
      )}
    </div>
  );
};

export default HomePage_Phone;
