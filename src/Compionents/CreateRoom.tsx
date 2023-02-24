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
import CreateRoom_Phone from "../Phone/CreateRoom_Phone";

interface Props {
  showMenu: boolean | null;
  setShowMenu: (state: boolean) => void;

  animationClass: string;
}

const CreateRoom: React.FC<Props> = ({
  setShowMenu,
  showMenu,
  animationClass,
}) => {
  const {
    currentUser,
    allUserRooms,
    setAllUserRooms,
    idAndToken,
    usersList,
    windowWidthForPhone,
  } = useContext(DataContext) as TypeDataContext;
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
      setTempNewParticipant("");
      if (currentUser?.username) {
        setNewRoomData({name: "", participants: [currentUser?._id]});
      }
    }
  }, [showMenu]);

  useEffect(() => {
    if (idAndToken?.id)
      setNewRoomData({name: "", participants: [idAndToken?.id]});
  }, [idAndToken?.id]);

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
    <>
      {windowWidthForPhone ? (
        <CreateRoom_Phone
          addParticipant={addParticipant}
          animationClass={animationClass}
          createRoom={createRoom}
          currentUser={currentUser}
          newRoomData={newRoomData}
          setNewRoomData={setNewRoomData}
          setShowMenu={setShowMenu}
          setTempNewParticipant={setTempNewParticipant}
          showMenu={showMenu}
          tempNewParticipant={tempNewParticipant}
          usersList={usersList}
        />
      ) : (
        <div className={"continer-createRoomOrFriendsList " + animationClass}>
          <div className="inputs-area-createRoom">
            <div className="inputAndButton-block-createRoom">
              <input
                className="inputs-createRoom"
                onChange={(e) => setTempNewParticipant(e.target.value.trim())}
                value={tempNewParticipant}
                placeholder="Participants"
                list="users"
              />

              <div
                className="addParticipantAndCreateRoom-button-createRoom"
                onClick={() => addParticipant(tempNewParticipant)}
              >
                Add Participant
              </div>
            </div>

            <div className="inputAndButton-block-createRoom">
              <input
                className="inputs-createRoom"
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
                    className="addParticipantAndCreateRoom-button-createRoom"
                    onClick={createRoom}
                  >
                    {" "}
                    Create Room{" "}
                  </div>
                )}
            </div>
          </div>

          <div className="Participants-window-continer-createRoom">
            <div className="Participants-window-createRoom">
              {newRoomData?.participants?.map((userID, index) => {
                const user = usersList?.find((item) => item._id == userID);
                if (user) {
                  if (userID == currentUser?._id) {
                    return (
                      <div
                        className="oneParticipant-block-createRoom"
                        key={index}
                      >
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
                        className="oneParticipant-block-createRoom hover-this-block-class"
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
        </div>
      )}
    </>
  );
};

export default CreateRoom;
