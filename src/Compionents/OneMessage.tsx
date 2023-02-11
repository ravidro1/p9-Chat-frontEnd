import react, {useContext, useEffect, useState} from "react";
import {TypeDataContext, TypeFunctionsContext, TypeMessage} from "../types";

import "../Style/oneMessage.css";
import {DataContext} from "../Contexts/DataContextProvider";
import {FunctionContext} from "../Contexts/FunctionsContextProvider";

interface Props {
  message: TypeMessage;
  lastMessageRef?: React.MutableRefObject<HTMLDivElement | null>;
}

const OneMessage: React.FC<Props> = ({message, lastMessageRef}) => {

  const {currentUser} = useContext(DataContext) as TypeDataContext;
  const {getTimeInString} = useContext(FunctionContext) as TypeFunctionsContext;


  const [message_alignSelf, setMessage_alignSelf] = useState("");
  const [message_backgroundColor, setMessage_backgroundColor] = useState("");
  const [messageContent_color, setMessageContent_color] = useState("");

  const [timeInString, setTimeString] = useState<{
    hour: string;
    date: string;
  }>();

  useEffect(() => {
    if (message.creationTime) {
      const time = new Date(message.creationTime);
      if (time) {
        const {date, hour} = getTimeInString(time);
        setTimeString({date, hour});
      }
    }

    const isCurrentUserIsWriter = message.from == currentUser?.username;

    setMessage_alignSelf(isCurrentUserIsWriter ? "flex-start" : "flex-end");
    setMessage_backgroundColor(isCurrentUserIsWriter ? "#05728f" : "#ebebeb");
    setMessageContent_color(isCurrentUserIsWriter ? "#f1f1f1" : "#404040");
  }, []);

  return (
    <div ref={lastMessageRef} className="main-OneMessage-oneMessage">
      <div
        className="messagePlusTime-oneMessage"
        style={{
          alignSelf: message_alignSelf,
        }}
      >
        <div
          className="writerPlusContent-oneMessage"
          style={{
            alignSelf: message_alignSelf,
            backgroundColor: message_backgroundColor,
          }}
        >
          <div className="MessageWriter-oneMessage">{message.from}</div>
          <div
            className="MessageContent-oneMessage"
            style={{
              color: messageContent_color,
            }}
          >
            {message.content}
          </div>
        </div>

        <div className="Time-oneMessage">
          <span>
            {timeInString?.hour} | {timeInString?.date}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OneMessage;
