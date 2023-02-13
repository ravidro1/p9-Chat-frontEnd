import axios from "axios";
import react, {useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {
  roomType,
  TypeDataContext,
  TypeFunctionsContext,
  userType,
} from "../types";
import {DataContext} from "./DataContextProvider";

const FunctionsContext = (): TypeFunctionsContext => {
  const {
    idAndToken,
    setAllUserMessages,
    setIdAndToken,
    setCurrentUser,
    setUsersList,
    setCurrentRoom,
    setAllUserRooms,
  } = useContext(DataContext) as TypeDataContext;

  const navigate = useNavigate();

  const logout = () => {
    axios
      .post(`${process.env.REACT_APP_EXPRESS_PORT}/Logout`, {id: idAndToken?.id})
      .then((res) => {
        setIdAndToken(undefined);
        setCurrentUser(undefined);
        setUsersList([]);
        setCurrentRoom(undefined);
        setAllUserRooms([]);
        setAllUserMessages([]);

        console.log("Logout");
        sessionStorage.removeItem("id");
        sessionStorage.removeItem("token");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const convertIDToUserObject = async (
    id: string
  ): Promise<userType | undefined> => {
    let result;
    try {
      result = await axios.post(`${process.env.REACT_APP_EXPRESS_PORT}/GetOneUser`, {id});
    } catch (err) {
      console.log(err);
    }

    if (result != undefined) return result?.data.user;
    return undefined;
  };

  const getCurrentUser = (id: string) => {
    if (id.length > 0) {
      axios
        .post(`${process.env.REACT_APP_EXPRESS_PORT}/GetOneUser`, {id})
        .then((res) => {
          setCurrentUser(res.data.user);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    let id = sessionStorage.getItem("id");
    let token = sessionStorage.getItem("token");

    if (typeof id == "string" && typeof token == "string") {
      setIdAndToken({id: JSON.parse(id), token: JSON.parse(token)});
      getAllUser(JSON.parse(id));
    }
  }, [sessionStorage.getItem("id")]);

  const getAllUser = (currentUserID: string) => {
    getCurrentUser(currentUserID);

    axios
      .post(`${process.env.REACT_APP_EXPRESS_PORT}/GetAllUsers`)
      .then((res) => {
        setUsersList(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTimeInString = (time: Date) => {
    const getHours = time.getHours();
    const getMinutes = time.getMinutes();

    const hour =
      (getHours.toString().length < 2 ? "0" + getHours : getHours) +
      ":" +
      (getMinutes.toString().length < 2 ? "0" + getMinutes : getMinutes);

    const getDate = time.getDate();
    const getMonth = time.getMonth();
    const getFullYear = time.getFullYear();

    let date =
      (getDate.toString().length < 2 ? "0" + getDate : getDate) +
      "." +
      ((getMonth + 1).toString().length < 2
        ? "0" + (getMonth + 1)
        : getMonth + 1) +
      "." +
      getFullYear;

    return {hour, date};
  };

  const joinAllRoomToSocket = (allRooms: roomType[], socket: any) => {
    allRooms?.map((currentRoom) => {
      socket.emit("joinRoom", currentRoom._id, (room: string) => {
        // coSnsole.log("join to room: " + room);
      });
    });
  };

  const joinSingelRoomToSocket = (singelRoomID: string, socket: any) => {
    socket.emit("joinRoom", singelRoomID, (room: string) => {
      // console.log("join to singel: " + singelRoomID);
    });
  };

  const getAllUserRoom = (id: string, socket: any) => {
    axios
      .post(`${process.env.REACT_APP_EXPRESS_PORT}/GetAllRooms`, {id})
      .then((res) => {
        // console.log(res.data.rooms);

        joinAllRoomToSocket(res.data.rooms, socket);
        joinSingelRoomToSocket(id, socket);
        setAllUserRooms(res.data.rooms);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllUserMessages = (id: string) => {
    axios
      .post(`${process.env.REACT_APP_EXPRESS_PORT}/GetAllUserMessages`, {id})
      .then((res) => {
        setAllUserMessages(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    convertIDToUserObject,
    getTimeInString,
    logout,
    joinAllRoomToSocket,
    joinSingelRoomToSocket,

    getAllUserRoom,
    getAllUserMessages,
  };
};

export default FunctionsContext;
