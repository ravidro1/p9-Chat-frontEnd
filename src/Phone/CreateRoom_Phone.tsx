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

import "./Phone_Style/createRoom_Phone.css";

interface Props {
  showMenu: boolean | null;
  setShowMenu: (state: boolean) => void;
  animationClass: string;

  setTempNewParticipant: (value: react.SetStateAction<string>) => void;
  tempNewParticipant: string;
  addParticipant: (newParticipantUsername: string) => void;
  newRoomData: roomType;
  createRoom: () => void;
  currentUser: userType | undefined;
  setNewRoomData: (value: react.SetStateAction<roomType>) => void;
  usersList: userType[] | undefined;
}

const CreateRoom_Phone: React.FC<Props> = ({
  setShowMenu,
  animationClass,
  showMenu,

  setTempNewParticipant,
  tempNewParticipant,
  addParticipant,
  newRoomData,
  createRoom,
  currentUser,
  setNewRoomData,
  usersList,
}) => {
  return (
    <div className={"continer-createRoomOrFriendsList_Phone " + animationClass}>
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
                  <div
                    className="oneParticipant-block-createRoom_Phone"
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
    </div>
  );
};

export default CreateRoom_Phone;
