import {roomType, TypeDataContext} from "../types";
import "./Phone_Style/chatWindowHeader_Phone.css";
 
import {socket} from "../App";
import {useEffect, useState, useContext} from "react";
import {DataContext} from "../Contexts/DataContextProvider";

interface Props {
  // currentRoom: roomType | undefined;
  thisRoomTypingQueue:
    | {
        senders: string[];
        roomID: string;
      }
    | undefined;
}

const ChatWindowHeader_Phone: React.FC<Props> = ({thisRoomTypingQueue}) => {
  const {currentRoom, typingQueue, setCurrentRoom} = useContext(
    DataContext
  ) as TypeDataContext;

  return (
    <div className="main-ChatWindowHeader_Phone">
      <div
        className="backArrow-ChatWindowHeader_Phone"
        onClick={() => setCurrentRoom(undefined)}
      >
        {" "}
        back{" "}
      </div>

      <div className="headLineAndTyping-ChatWindowHeader_Phone">
        <div className="leftSide-ChatWindowHeader_Phone">
          <div className="nameOfRoom-ChatWindowHeader_Phone">
            {"Name Of Room: "} <strong> {currentRoom?.name} </strong>
          </div>
          <div className="numberOfMembers-ChatWindowHeader_Phone">
            {"Members: "} <strong> {currentRoom?.participants?.length} </strong>
          </div>
        </div>

        <div className="rightSide-ChatWindowHeader_Phone">
          {thisRoomTypingQueue && thisRoomTypingQueue?.senders?.length > 0 && (
            <div> {thisRoomTypingQueue?.senders[0]} Typing... </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatWindowHeader_Phone;
