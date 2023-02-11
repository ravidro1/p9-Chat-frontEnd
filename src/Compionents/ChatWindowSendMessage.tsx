import {useContext, useState, useEffect} from "react";
import {socket} from "../App";
import {TypeDataContext, TypeMessage, userType} from "../types";

import "../Style/chatWindowSend.css";
import {DataContext} from "../Contexts/DataContextProvider";

const ChatWindowSendMessage: React.FC<{}> = ({}) => {
  const {currentRoom, currentUser, allUserMessages, setAllUserMessages} =
    useContext(DataContext) as TypeDataContext;

  const [tempMessageContent, setTempMessageContent] = useState<string>("");

  useEffect(() => {
    socket.on("recive-message", (recive: TypeMessage) => {
      setAllUserMessages((prev: TypeMessage[]): TypeMessage[] => [
        ...prev,
        recive,
      ]);
    });
    return () => {
      socket.off("recive-message");
    };
  }, []);

  const sendMessage = () => {
    setTempMessageContent("");

    if (currentUser && currentRoom?._id && tempMessageContent) {
      let newMessage: TypeMessage = {
        from: currentUser.username,
        room: currentRoom._id,
        content: tempMessageContent,
      };
      socket.emit("newMessage", newMessage, (id: string, currentTime: Date) => {
        const newMessageWithID = {
          ...newMessage,
          _id: id,
          creationTime: currentTime,
        };
        if (allUserMessages)
          setAllUserMessages((prev) => [...prev, newMessageWithID]);
      });
    }
  };

  const typing = (data: string) => {
    if (data.length > 0)
      socket.emit(
        "transmit-IsTyping",
        currentUser?.username,
        true,
        currentRoom?._id,
      );
    else
      socket.emit(
        "transmit-IsTyping",
        currentUser?.username,
        false,
        currentRoom?._id,
      );
  };

  useEffect(() => {
    typing(tempMessageContent);
  }, [tempMessageContent]);

  useEffect(() => {
    setTempMessageContent("");
  }, [currentRoom]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className="main-chatWindowSendMessage"
    >
      <input
        className="input-chatWindowSendMessage"
        placeholder="Send..."
        value={tempMessageContent}
        onChange={(e) => setTempMessageContent(e.target.value)}
        type="text"
      />

      <button
        type="submit"
        className="sendButton-chatWindowSendMessage"
        onClick={sendMessage}
      >
        Send
      </button>
    </form>
  );
};

export default ChatWindowSendMessage;
