import {TypeMessage} from "../types";
import "../Style/chatWindowContent.css";
import {useEffect, useRef} from "react";
import OneMessage from "./OneMessage";

interface Props {
  allCurrentRoomMessages: TypeMessage[] | undefined;
}

const ChatWindowContent: React.FC<Props> = ({allCurrentRoomMessages}) => {
  const lastMessageRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({behavior: "smooth"});
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
