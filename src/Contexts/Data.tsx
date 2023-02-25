import {useEffect, useState} from "react";
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
  const [allUserFriends, setAllUserFriends] = useState<userType[]>([]);

  const [typingQueue, setTypingQueue] = useState<
    {senders: string[]; roomID: string}[]
  >([]);

  const [windowWidthForPhone, setWindowWidthForPhone] = useState<boolean>(
    window.innerWidth < 800
  );

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidthForPhone(window.innerWidth < 800);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

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

    allUserFriends,
    setAllUserFriends,

    windowWidthForPhone,
  };
};

export default Data;
