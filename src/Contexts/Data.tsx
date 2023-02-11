import axios from "axios";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {
  idAndTokenType,
  roomType,
  TypeDataContext,
  TypeMessage,
  userType,
} from "../types";

const Data = (): TypeDataContext => {
  const [idAndToken, setIdAndToken] = useState<idAndTokenType | undefined>();
  const [currentUser, setCurrentUser] = useState<userType | undefined>();
  const [usersList, setUsersList] = useState<userType[]>([]);
  const [currentRoom, setCurrentRoom] = useState<roomType | undefined>();
  const [allUserRooms, setAllUserRooms] = useState<roomType[]>([]);
  const [allUserMessages, setAllUserMessages] = useState<TypeMessage[]>([]);

  const [typingQueue, setTypingQueue] = useState<
    {senders: string[]; roomID: string}[]
  >([]);

  return {
    idAndToken,
    setIdAndToken,

    currentUser,
    setCurrentUser,

    usersList,
    setUsersList,

    currentRoom,
    setCurrentRoom,

    allUserRooms,
    setAllUserRooms,

    allUserMessages,
    setAllUserMessages,

    typingQueue,
    setTypingQueue,
  };
};

export default Data;
