import react, {useContext, useEffect, useState} from "react";
import {
  roomType,
  TypeDataContext,
  TypeFunctionsContext,
  userType,
} from "../types";
import "../Style/createRoom.css";
import {socket} from "../App";
import {DataContext} from "../Contexts/DataContextProvider";
import {FunctionContext} from "../Contexts/FunctionsContextProvider";

interface Props {}

const CreateRoom: React.FC<Props> = () => {
  const {currentUser, allUserRooms, setAllUserRooms, idAndToken, usersList} =
    useContext(DataContext) as TypeDataContext;
  const {joinSingelRoomToSocket} = useContext(
    FunctionContext
  ) as TypeFunctionsContext;

  const [newRoomData, setNewRoomData] = useState<roomType>({
    name: "",
    participants: [],
  });

  const [tempNewParticipant, setTempNewParticipant] = useState("");

  useEffect(() => {
    if (idAndToken?.id)
      setNewRoomData({name: "", participants: [idAndToken?.id]});
  }, [idAndToken?.id]);

  useEffect(() => {
    socket.on("recive-newRoom", (receive: roomType) => {
      console.log(receive);
      if(receive._id) joinSingelRoomToSocket(receive._id, socket);
      
      setAllUserRooms((prev: roomType[]): roomType[] => [...prev, receive]);
    });
    return () => {
      socket.off("recive-newRoom");
    };
  }, []);

  const createRoom = () => {
    const tempCreatorAndTime = {
      creationTime: new Date(),
      creator: currentUser?.username,
    };

    const newRoomDataWithTimeAndCreator = {
      ...newRoomData,
      ...tempCreatorAndTime,
    };

    socket.emit(
      "createRoom",
      newRoomDataWithTimeAndCreator,
      (newRoom: roomType) => {
        if (allUserRooms && idAndToken?.id) {
          setAllUserRooms([...allUserRooms, newRoom]);
          if (newRoom._id) joinSingelRoomToSocket(newRoom._id, socket);
          setNewRoomData({name: "", participants: [idAndToken?.id]});
        }
      }
    );
  };

  const addParticipant = (newParticipantUsername: string) => {
    const newParticipant = usersList?.find(
      (item) => item.username == newParticipantUsername
    );

    if (newParticipant) {
      const isUserAlreadyIn = newRoomData?.participants?.includes(
        newParticipant?._id
      );
      console.log(isUserAlreadyIn);

      if (newRoomData.participants && !isUserAlreadyIn) {
        const tempParticipants = [...newRoomData?.participants];
        tempParticipants.push(newParticipant._id);

        setNewRoomData({...newRoomData, participants: tempParticipants});
        setTempNewParticipant("");
      } else if (isUserAlreadyIn) {
        alert("User Already In");
      }
    } else alert("User Not Exist");
  };

  return (
    <div className="main-createRoom">
      <input
        value={newRoomData?.name}
        onChange={(e) =>
          setNewRoomData({...newRoomData, name: e.target.value.trim()})
        }
        placeholder="Room Name"
      />
      <input
        onChange={(e) => setTempNewParticipant(e.target.value.trim())}
        value={tempNewParticipant}
        placeholder="Participants"
        list="users"
      />

      {newRoomData?.participants?.map((userID, index) => {
        const user = usersList?.find((item) => item._id == userID);
        if (user) {
          return <span key={index}> {user.username} ,</span>;
        }
      })}
      <button onClick={() => addParticipant(tempNewParticipant)}>
        {" "}
        Add Participant{" "}
      </button>
      {newRoomData.participants && newRoomData.name && !tempNewParticipant && (
        <button onClick={createRoom}> Create Room </button>
      )}

      <datalist id="users">
        {usersList?.map((user, index) => {
          if (!newRoomData.participants?.includes(user._id)) {
            return (
              <option key={index} value={String(user.username)}>
                {user.username}
              </option>
            );
          }
        })}
      </datalist>
    </div>
  );
};

export default CreateRoom;
