import react, {useContext, useEffect, useState} from "react";
import {
  roomType,
  TypeDataContext,
  TypeFunctionsContext,
  userType,
} from "../types";
import {socket} from "../App";
import {DataContext} from "../Contexts/DataContextProvider";
import {FunctionContext} from "../Contexts/FunctionsContextProvider";

import "./createRoom_Phone.css";

interface Props {
  showMenu: boolean | null;
  setShowMenu: (state: boolean) => void;
  animationClass: string;
}

const CreateRoom_Phone: React.FC<Props> = ({
  setShowMenu,
  animationClass,
  showMenu,
}) => {
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
    if (!showMenu) {
      // console.log("osda1");

      setTempNewParticipant("");
      if (currentUser?.username) {
        // console.log("osda12");

        setNewRoomData({name: "", participants: [currentUser?._id]});
      }
    }
  }, [showMenu]);

  useEffect(() => {
    if (idAndToken?.id)
      setNewRoomData({name: "", participants: [idAndToken?.id]});
  }, [idAndToken?.id]);

  // useEffect(() => {
  //   socket.on("recive-newRoom", (receive: roomType) => {
  //     console.log(receive);
  //     if (receive._id) joinSingelRoomToSocket(receive._id, socket);
  //     console.log("dsaassa");

  //     setAllUserRooms((prev: roomType[]): roomType[] => [...prev, receive]);
  //   });
  //   return () => {
  //     socket.off("recive-newRoom");
  //   };
  // }, []);

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
        setShowMenu(false);
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
      // console.log(isUserAlreadyIn);

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
    <div data-value="child" className={"continer-createRoom_Phone " + animationClass}>
      {/* <div className="main-createRoom"> */}

      <div className="inputs-area-createRoom_Phone">
        <div className="inputAndButton-block-createRoom_Phone">
          <input
            className="inputs-createRoom_Phone"
            onChange={(e) => setTempNewParticipant(e.target.value.trim())}
            value={tempNewParticipant}
            placeholder="Participants"
            list="users"
          />

          <div
            className="addParticipantAndCreateRoom-button-createRoom_Phone"
            onClick={() => addParticipant(tempNewParticipant)}
          >
            Add Participant
          </div>
        </div>

        <div className="inputAndButton-block-createRoom_Phone">
          <input
            className="inputs-createRoom_Phone"
            value={newRoomData?.name}
            onChange={(e) =>
              setNewRoomData({...newRoomData, name: e.target.value.trim()})
            }
            placeholder="Room Name"
          />
          {newRoomData.participants &&
            newRoomData.name &&
            !tempNewParticipant && (
              <div
                className="addParticipantAndCreateRoom-button-createRoom_Phone"
                onClick={createRoom}
              >
                {" "}
                Create Room{" "}
              </div>
            )}
        </div>
      </div>

      <div className="Participants-window-continer-createRoom_Phone">
        <div className="Participants-window-_Phone">
          {newRoomData?.participants?.map((userID, index) => {
            const user = usersList?.find((item) => item._id == userID);
            if (user) {
              if (userID == currentUser?._id) {
                return (
                  <div className="oneParticipant-block-createRoom_Phone" key={index}>
                    {" "}
                    {user.username}
                  </div>
                );
              } else {
                return (
                  <div
                    onClick={() => {
                      setNewRoomData({
                        ...newRoomData,
                        participants: newRoomData?.participants?.filter(
                          (item) => item != userID
                        ),
                      });
                    }}
                    className="oneParticipant-block-createRoom_Phone hover-this-block-class_Phone"
                    key={index}
                  >
                    {" "}
                    {user.username}
                  </div>
                );
              }
            }
          })}
        </div>
      </div>

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
      {/* </div> */}
    </div>
  );
};

export default CreateRoom_Phone;
