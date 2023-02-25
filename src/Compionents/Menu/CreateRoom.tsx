import react, { useContext, useEffect, useState } from "react";
import {
  roomType,
  TypeDataContext,
  TypeFunctionsContext,
  userType,
} from "../../types";
import "../../Style/createRoom.css";
import { socket } from "../../App";
import { DataContext } from "../../Contexts/DataContextProvider";
import { FunctionContext } from "../../Contexts/FunctionsContextProvider";
import CreateRoom_Phone from "../../Phone/CreateRoom_Phone";

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

  const [searchFriendText, setSearchFriendText] = useState<string>("");

  const { joinSingelRoomToSocket } = useContext(
    FunctionContext
  ) as TypeFunctionsContext;

  const [newRoomData, setNewRoomData] = useState<roomType>({
    name: "",
    participants: [],
  });

  useEffect(() => {
    setSearchFriendText("");
    if (currentUser?.username) {
      setNewRoomData({ name: "", participants: [currentUser?._id] });
    }
  }, [showMenu]);

  useEffect(() => {
    if (idAndToken?.id)
      setNewRoomData({ name: "", participants: [idAndToken?.id] });
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
          setNewRoomData({ name: "", participants: [idAndToken?.id] });
        }
        setShowMenu(false);
      }
    );
  };

  const addParticipant = (newParticipant: userType) => {
    if (newRoomData.participants) {
      const tempParticipants = [...newRoomData?.participants];
      tempParticipants.push(newParticipant._id);

      setNewRoomData({ ...newRoomData, participants: tempParticipants });
    }
  };

  const findUserByID = (userID: string) => {
    return usersList?.find((item) => item._id == userID);
  };

  const [isHover, setIsHover] = useState<boolean>(false);

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
          showMenu={showMenu}
          usersList={usersList}
        />
      ) : (
        <div
          className={
            "continer-createRoomOrFriendsListOrSettings " + animationClass
          }
        >
          <div className="ParticipantsAndAllFriens-windows-continer-createRoom">
            <div className="itemsBlocks-createRoom">
              <input
                value={searchFriendText}
                className="input-allFriends-window-createRoom"
                placeholder="Search Friend..."
                onChange={(e) =>
                  setSearchFriendText(e.target.value.toLocaleLowerCase().trim())
                }
              />

              {currentUser?.friendsList?.map((userID, index) => {
                const user = findUserByID(userID);
                if (
                  user &&
                  userID != currentUser?._id &&
                  user.username
                    .toLocaleLowerCase()
                    .includes(searchFriendText) &&
                  !newRoomData.participants?.includes(userID)
                ) {
                  return (
                    <div
                      className="oneParticipant-block-createRoom hover-this-block-class"
                      key={index}
                      onClick={() => {
                        addParticipant(user);
                        setSearchFriendText("");
                      }}
                    >
                      {user.username}
                    </div>
                  );
                }
              })}
            </div>

            <div className="itemsBlocks-createRoom">
              {newRoomData?.participants?.map((userID, index) => {
                const user = findUserByID(userID);
                const isCurrentUser = userID == currentUser?._id;
                if (user) {
                  return (
                    <div
                      className="oneParticipant-block-createRoom"
                      key={index}
                    >
                      {isCurrentUser ? (
                        <div> You </div>
                      ) : (
                        <div
                          className="deleteOrUserNameItem-oneParticipant-createRoom"
                          onMouseEnter={() => setIsHover(true)}
                          onMouseLeave={() => setIsHover(false)}
                        >
                          <span className="Username-oneParticipant-createRoom">
                            {" "}
                            {user.username}{" "}
                          </span>

                          <span
                            className="deleteButton-oneParticipant-createRoom hover-this-block-class"
                            onClick={() => {
                              setNewRoomData({
                                ...newRoomData,
                                participants: newRoomData?.participants?.filter(
                                  (item) => item != userID
                                ),
                              });
                            }}
                          >
                            X
                          </span>
                        </div>
                      )}
                    </div>
                  );
                }
              })}
            </div>
          </div>

          <div className="inputAndButton-block-createRoom">
            <input
              className="roomName-input-createRoom"
              value={newRoomData?.name}
              onChange={(e) =>
                setNewRoomData({
                  ...newRoomData,
                  name: e.target.value.trim(),
                })
              }
              placeholder="Room Name..."
            />

            <div
              style={{
                backgroundColor:
                  newRoomData.participants && newRoomData.name
                    ? "#05728f"
                    : "#92bbc7",

                cursor:
                  newRoomData.participants && newRoomData.name && "pointer",
              }}
              className="CreateRoom-button-createRoom"
              onClick={createRoom}
            >
              Create Room
            </div>
            {/* )} */}
          </div>
        </div>
      )}
    </>
  );
};

export default CreateRoom;
