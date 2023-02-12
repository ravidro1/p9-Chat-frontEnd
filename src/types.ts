import react from "react";

export type userType = {
  username: string;
  password: string;
  _id: string;
  previousRooms: [string];
  previousMessages: [string];
};

export type roomType = {
  name: string;
  _id?: string;
  participants?: string[];
  creationTime?: Date;
  creator?: string;

  numberOfUnreadMessages?: number;

  // isTyping?: {sender: string; typing: boolean};
};

export type TypeMessage = {
  from: string;
  id?: string;
  room: string;
  content: string;
  creationTime?: Date;
};

export type idAndTokenType = {
  id: string;
  token: string;
};

////////////////////////////////////////////////////////////

export type TypeDataContext = {
  idAndToken?: idAndTokenType;
  setIdAndToken: react.Dispatch<
    react.SetStateAction<idAndTokenType | undefined>
  >;

  currentUser?: userType;
  setCurrentUser: react.Dispatch<react.SetStateAction<userType | undefined>>;

  usersList?: userType[];
  setUsersList: react.Dispatch<react.SetStateAction<userType[]>>;

  currentRoom?: roomType;
  setCurrentRoom: react.Dispatch<react.SetStateAction<roomType | undefined>>;

  allUserRooms?: roomType[];
  setAllUserRooms: react.Dispatch<react.SetStateAction<roomType[]>>;

  allUserMessages?: TypeMessage[];
  setAllUserMessages: react.Dispatch<react.SetStateAction<TypeMessage[]>>;

  typingQueue?: {senders: string[]; roomID: string}[];
  setTypingQueue: react.Dispatch<
    react.SetStateAction<{senders: string[]; roomID: string}[]>
  >;
};

export type TypeSizeContext = {
  creationTime_oneContant_ref: react.MutableRefObject<HTMLDivElement | null>;
};

export type TypeFunctionsContext = {
  logout: () => void;
  getTimeInString: (time: Date) => {hour: string; date: string};
  convertIDToUserObject: (id: string) => Promise<userType | undefined>;
  joinAllRoomToSocket: (allRooms: roomType[], socket: any) => void;
  joinSingelRoomToSocket: (singelRoomID: string, socket: any) => void;

  getAllUserRoom: (id: string, socket: any) => void;
  getAllUserMessages: (id: string) => void;
};
