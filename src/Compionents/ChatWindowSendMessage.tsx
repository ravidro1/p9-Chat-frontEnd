import {useContext, useRef, useState, useEffect} from "react";
import {socket} from "../App";
import {TypeDataContext, TypeMessage, userType} from "../types";

import "../Style/chatWindowSend.css";
import {DataContext} from "../Contexts/DataContextProvider";

const ChatWindowSendMessage: React.FC<{}> = ({}) => {
  const {
    currentRoom,
    currentUser,
    allUserMessages,
    setAllUserRooms,
    setAllUserMessages,
  } = useContext(DataContext) as TypeDataContext;

  const [tempMessageContent, setTempMessageContent] = useState<string>("");

  const [isSuccess, setIsSuccess] = useState(true);

  const [canTyping, setCanTyping] = useState(true);

  const sendMessage = () => {
    if (isSuccess && tempMessageContent) {
      setIsSuccess(false);
      setCanTyping(false);

      if (currentUser && currentRoom?._id && tempMessageContent) {
        let newMessage: TypeMessage = {
          from: currentUser.username,
          room: currentRoom._id,
          content: tempMessageContent,
        };
        socket.emit(
          "newMessage",
          newMessage,
          (id: string, currentTime: Date) => {
            const newMessageWithID = {
              ...newMessage,
              _id: id,
              creationTime: currentTime,
            };
            setTempMessageContent("");

            setAllUserRooms((prev) => {
              const messageRoomIndex = prev.findIndex(
                (item) => item._id == newMessage.room
              );

              const copyOfArray = [...prev];
              copyOfArray[messageRoomIndex].lastTimeActive = new Date();
              return copyOfArray;
            });

            if (allUserMessages)
              setAllUserMessages((prev) => [...prev, newMessageWithID]);
            setTimeout(() => {
              setIsSuccess(true);
              setCanTyping(true);
            }, 350);
          }
        );
      }
    }
  };

  const typing = (data: string) => {
    if (data.length > 0)
      socket.emit(
        "transmit-IsTyping",
        currentUser?.username,
        true,
        currentRoom?._id
      );
    else
      socket.emit(
        "transmit-IsTyping",
        currentUser?.username,
        false,
        currentRoom?._id
      );
  };

  useEffect(() => {
    typing(tempMessageContent);
  }, [tempMessageContent]);

  useEffect(() => {
    setTempMessageContent("");
  }, [currentRoom]);

  useEffect(() => {}, [canTyping]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className="main-chatWindowSendMessage"
    >
      <input
        disabled={canTyping ? false : true}
        className="input-chatWindowSendMessage"
        placeholder="Send..."
        value={tempMessageContent}
        onChange={(e) => {
          // if (canTyping) {
          setTempMessageContent(e.target.value);
          // }
        }}
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
