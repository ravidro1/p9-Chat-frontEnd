import { TypeDataContext } from "../../types";
import "../../Style/chatWindowHeader.css";
import { useEffect, useState, useContext } from "react";
import { DataContext } from "../../Contexts/DataContextProvider";
import ChatWindowHeader_Phone from "../../Phone/ChatWindowHeader_Phone";

interface Props {
  // currentRoom: roomType | undefined;
}

const ChatWindowHeader: React.FC<Props> = () => {
  const { currentRoom, typingQueue, windowWidthForPhone } = useContext(
    DataContext
  ) as TypeDataContext;

  const [thisRoomTypingQueue, setThisRoomTypingQueue] = useState<
    | {
        senders: string[];
        roomID: string;
      }
    | undefined
  >();

  useEffect(() => {
    setThisRoomTypingQueue(
      typingQueue?.find((room) => currentRoom?._id == room.roomID)
    );
  }, [typingQueue]);

  return (
    <>
      {windowWidthForPhone ? (
        <ChatWindowHeader_Phone thisRoomTypingQueue={thisRoomTypingQueue} />
      ) : (
        <div className="main-ChatWindowHeader">
          <div className="leftSide-ChatWindowHeader">
            <div className="nameOfRoom-ChatWindowHeader">
              {"Name Of Room: "} <strong> {currentRoom?.name} </strong>
            </div>
            <div className="numberOfMembers-ChatWindowHeader">
              {"Members: "}{" "}
              <strong> {currentRoom?.participants?.length} </strong>
            </div>
          </div>

          <div className="rightSide-ChatWindowHeader">
            {thisRoomTypingQueue &&
              thisRoomTypingQueue?.senders?.length > 0 && (
                <div> {thisRoomTypingQueue?.senders[0]} Typing... </div>
              )}
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWindowHeader;
