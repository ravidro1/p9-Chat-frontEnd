import react, {useRef, useContext, useEffect, useState} from "react";
import {
  roomType,
  TypeDataContext,
  TypeFunctionsContext,
  TypeMessage,
  TypeSizeContext,
} from "../../types";
import "../../Style/oneContant.css";
import {DataContext} from "../../Contexts/DataContextProvider";
import {FunctionContext} from "../../Contexts/FunctionsContextProvider";
import {SizeContext} from "../../Contexts/SizesContextProvider";
import {socket} from "../../App";
import axios from "axios";
import OneContact_Phone from "../../Phone/OneContact_Phone";

interface Props {
  oneRoom: roomType;
}

const OneContact: React.FC<Props> = ({oneRoom}) => {
  const {
    idAndToken,
    setCurrentRoom,
    allUserMessages,
    currentUser,
    currentRoom,
    typingQueue,
    setAllUserRooms,
    windowWidthForPhone,
  } = useContext(DataContext) as TypeDataContext;

  const {getTimeInString} = useContext(FunctionContext) as TypeFunctionsContext;

  const {creationTime_oneContant_ref} = useContext(
    SizeContext
  ) as TypeSizeContext;

  const [lastMessage, setLastMessage] = useState<TypeMessage | undefined>();
  const [roomCreationTime, setRoomCreationTime] = useState("");
  const [lastMessageCeationTime, setLastMessageCreationTime] = useState("");

  const changeCurrentRoom = () => {
    socket.emit(
      "transmit-IsTyping",
      currentUser?.username,
      false,
      currentRoom?._id
    );

    setAllUserRooms((prev) => {
      const roomIndex = prev.findIndex((item) => item._id == oneRoom?._id);
      const copyOfArray = [...prev];
      copyOfArray[roomIndex] = {
        ...copyOfArray[roomIndex],
        numberOfUnreadMessages: 0,
      };
      return copyOfArray;
    });

    axios
      .post(`${process.env.REACT_APP_EXPRESS_PORT}/UpdateUnreadMessage`, {
        id: idAndToken?.id,
        roomID: oneRoom?._id,
        newUnreadMessagesNumber: 0,
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    setCurrentRoom(oneRoom);
  };

  useEffect(() => {
    getLastRoomMessage();

    if (oneRoom.creationTime) {
      setRoomCreationTime(
        `Created At: ${
          getTimeInString(new Date(oneRoom.creationTime)).hour
        } | ${getTimeInString(new Date(oneRoom.creationTime)).date}`
      );
    }
  }, [allUserMessages]);

  const getLastRoomMessage = () => {
    const messagesForCurrentRoom = allUserMessages?.filter(
      (message) => message.room == oneRoom?._id
    );
    let lastMessageForCurrentRoom = undefined;

    if (messagesForCurrentRoom) {
      lastMessageForCurrentRoom =
        messagesForCurrentRoom[messagesForCurrentRoom.length - 1];
    }
    setLastMessage(lastMessageForCurrentRoom);

    if (lastMessageForCurrentRoom?.creationTime) {
      setLastMessageCreationTime(
        ` ${
          getTimeInString(new Date(lastMessageForCurrentRoom.creationTime)).hour
        } | ${
          getTimeInString(new Date(lastMessageForCurrentRoom.creationTime)).date
        }`
      );
    }
  };

  const [thisRoomTypingQueue, setThisRoomTypingQueue] = useState<{
    senders: string[];
    roomID: string;
  }>();

  useEffect(() => {
    setThisRoomTypingQueue(
      typingQueue?.find((room) => oneRoom._id == room.roomID)
    );
  }, [typingQueue]);

  return (
    <>
      {windowWidthForPhone ? (
        <OneContact_Phone
          changeCurrentRoom={changeCurrentRoom}
          lastMessage={lastMessage}
          lastMessageCeationTime={lastMessageCeationTime}
          oneRoom={oneRoom}
          roomCreationTime={roomCreationTime}
          thisRoomTypingQueue={thisRoomTypingQueue}
        />
      ) : (
        <div onClick={changeCurrentRoom} className="main-oneContant">
          <div className="Continer-roomName-oneContant">
            <div className="roomName-oneContant">
              <strong> {oneRoom.name} </strong>
            </div>

            {Number(oneRoom?.numberOfUnreadMessages) > 0 && (
              <div className="numberOfUnreadMessages-oneContant">
                {oneRoom.numberOfUnreadMessages}
              </div>
            )}
          </div>

          {lastMessage &&
            !(
              thisRoomTypingQueue && thisRoomTypingQueue?.senders?.length > 0
            ) && (
              <>
                <div className="lastMessage-oneContant">
                  {lastMessage?.from}: {lastMessage?.content}{" "}
                </div>

                <div className="lastMessage-creationTime-oneContant">
                  {lastMessage.creationTime && lastMessageCeationTime}
                </div>
              </>
            )}

          {!lastMessage &&
            !(
              thisRoomTypingQueue && thisRoomTypingQueue?.senders?.length > 0
            ) && (
              <>
                <div
                  ref={creationTime_oneContant_ref}
                  className="roomCreationTime-oneContant"
                >
                  {oneRoom.creationTime && <>{roomCreationTime}</>}
                </div>
              </>
            )}

          {thisRoomTypingQueue && thisRoomTypingQueue?.senders?.length > 0 && (
            <div className="typing-oneContant">
              {thisRoomTypingQueue?.senders[0]} Typing...
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default OneContact;
