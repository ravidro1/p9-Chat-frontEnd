import axios from "axios";
import react, {useContext, useEffect, useState} from "react";
import "../Style/chatWindow.css";
import {TypeDataContext, TypeMessage, userType} from "../types";
import ChatWindowContent from "./ChatWindowContent";
import ChatWindowHeader from "./ChatWindowHeader";
import ChatWindowSendMessage from "./ChatWindowSendMessage";

import "../Style/chatWindow.css";
import {DataContext} from "../Contexts/DataContextProvider";
import { socket } from "../App";

interface Props {}

const ChatWindow: React.FC<Props> = ({}) => {
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



  return (
    <div className="main-chatWindow">
      {currentRoom ? (
        <>
          <ChatWindowHeader />
          <ChatWindowContent allCurrentRoomMessages={allCurrentRoomMessages} />
          <ChatWindowSendMessage />
        </>
      ) : (
        <>RaviChat</>
      )}
    </div>
  );
};

export default ChatWindow;
