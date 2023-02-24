import react, {useContext, useEffect, useState} from "react";
import {
  roomType,
  TypeDataContext,
  TypeFunctionsContext,
  TypeMessage,
  TypeSizeContext,
} from "../types";
import "./Phone_Style/oneContant_Phone.css";
import {DataContext} from "../Contexts/DataContextProvider";
import {FunctionContext} from "../Contexts/FunctionsContextProvider";
import {SizeContext} from "../Contexts/SizesContextProvider";

interface Props {
  oneRoom: roomType;

  changeCurrentRoom: () => void;
  lastMessage: TypeMessage | undefined;
  thisRoomTypingQueue:
    | {
        senders: string[];
        roomID: string;
      }
    | undefined;
  roomCreationTime: string;
  lastMessageCeationTime: string;
}

const OneContact_Phone: React.FC<Props> = ({
  oneRoom,
  changeCurrentRoom,
  lastMessage,
  thisRoomTypingQueue,
  roomCreationTime,
  lastMessageCeationTime,
}) => {
  const {
    idAndToken,
    setCurrentRoom,
    allUserMessages,
    currentUser,
    currentRoom,
    typingQueue,
    setAllUserRooms,
  } = useContext(DataContext) as TypeDataContext;

  const {getTimeInString} = useContext(FunctionContext) as TypeFunctionsContext;

  const {creationTime_oneContant_ref} = useContext(
    SizeContext
  ) as TypeSizeContext;

  return (
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
        !(thisRoomTypingQueue && thisRoomTypingQueue?.senders?.length > 0) && (
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
        !(thisRoomTypingQueue && thisRoomTypingQueue?.senders?.length > 0) && (
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
  );
};

export default OneContact_Phone;
