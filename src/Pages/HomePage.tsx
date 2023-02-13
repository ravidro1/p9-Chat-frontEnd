import axios from "axios";
import react, {useContext, useEffect, useState} from "react";
import ChatWindow from "../Compionents/ChatWindow";
import ContactWindow from "../Compionents/ContactSection";
import CreateRoom from "../Compionents/CreateRoom";
import {TypeDataContext, TypeFunctionsContext, TypeMessage} from "../types";
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
    idAndToken,
    currentRoom,
    setAllUserMessages,
    setTypingQueue,
  } = useContext(DataContext) as TypeDataContext;

  const {getAllUserRoom, getAllUserMessages} = useContext(
    FunctionContext
  ) as TypeFunctionsContext;

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

      setMessageRecive(recive);
    });

    return () => {
      socket.off("recive-message");
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

  return (
    <div className="main-homePage">
      <div className="upperSection-homePage">
        <NavBar />
      </div>


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
