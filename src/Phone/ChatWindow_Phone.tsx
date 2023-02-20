import axios from "axios";
import react, {useContext, useEffect, useState} from "react";
import "../Style/chatWindow.css";
import {TypeDataContext, TypeMessage, userType} from "../types";

import {DataContext} from "../Contexts/DataContextProvider";
import {socket} from "../App";

import {useLottie} from "lottie-react";

import robot from "../assets/113801-robot-green-eyes.json";
import ChatWindowHeader from "./ChatWindowHeader_Phone";
import ChatWindowContent from "./ChatWindowContent_Phone";
import ChatWindowSendMessage from "../Compionents/ChatWindowSendMessage";

interface Props {}

const ChatWindow_Phone: React.FC<Props> = () => {
  const {currentRoom, allUserMessages} = useContext(
    DataContext
  ) as TypeDataContext;

  const [allCurrentRoomMessages, setAllCurrentRoomMessages] =
    useState<TypeMessage[]>();

  useEffect(() => {
    const messagesForCurrentRoom = allUserMessages?.filter(
      (message) => message.room == currentRoom?._id
    );

    if (messagesForCurrentRoom) {
      setAllCurrentRoomMessages(messagesForCurrentRoom);
    }
  }, [currentRoom, allUserMessages]);

  const options = {
    animationData: robot,
    loop: true,
  };

  const {View} = useLottie(options);

  return (
    <div className="main-chatWindow">
      {currentRoom ? (
        <>
          <ChatWindowHeader />
          <ChatWindowContent allCurrentRoomMessages={allCurrentRoomMessages} />
          <ChatWindowSendMessage />
        </>
      ) : (
        <>
          <div className="emptyChat-Window-chatWindow">
            <div className="robotGif-continer-chatWindow">{View}</div>
            <div className="emptyChat-text-chatWindow">
              Select Room Or Create New Room To Start Chat
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatWindow_Phone;
