import { TypeDataContext, TypeMessage } from "../../types";
import "../../Style/chatWindowContent.css";
import { useEffect, useRef, useContext } from "react";
import OneMessage from "./OneMessage";
import { DataContext } from "../../Contexts/DataContextProvider";

interface Props {
  allCurrentRoomMessages: TypeMessage[] | undefined;
}

const ChatWindowContent: React.FC<Props> = ({ allCurrentRoomMessages }) => {
  const { currentRoom, allUserMessages, windowWidthForPhone } = useContext(
    DataContext
  ) as TypeDataContext;

  const lastMessageRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allCurrentRoomMessages]);

  return (
    <div className="main-chatWindowContent">
      {allCurrentRoomMessages?.map((message, index) => {
        return (
          <OneMessage
            key={index}
            message={message}
            lastMessageRef={lastMessageRef}
          />
        );
      })}
    </div>
  );
};

export default ChatWindowContent;
