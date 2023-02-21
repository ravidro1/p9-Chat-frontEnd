import react, {useState, useEffect, useContext} from "react";
import {roomType, TypeDataContext} from "../types";
import OneContact from "./OneContact_Phone";
import {DataContext} from "../Contexts/DataContextProvider";

import "./contantSection_Phone.css";

interface Props {}

const ContactWindow_Phone: React.FC<Props> = ({}) => {
  const {allUserRooms, currentRoom, setCurrentRoom} = useContext(
    DataContext
  ) as TypeDataContext;

  const [searchRoomList, setSearchRoomList] = useState<
    roomType[] | undefined
  >();

  useEffect(() => {
    setSearchRoomList(
      allUserRooms?.sort((a, b) => {
        if (a?.lastTimeActive && b?.lastTimeActive) {
          if (
            new Date(b?.lastTimeActive).getTime() -
              new Date(a?.lastTimeActive).getTime() >
            0
          )
            return 1;
          else if (
            new Date(b?.lastTimeActive).getTime() -
              new Date(a?.lastTimeActive).getTime() <
            0
          )
            return -1;
          else return 0;
        } else {
          return 0;
        }
      })
    );

    if (currentRoom) {
      setCurrentRoom(
        allUserRooms?.find((room) => room._id == currentRoom?._id)
      );
    }
  }, [allUserRooms]);

  const updateRoomBySearch = (searchValue: string) => {
    const searchedRoomArray = allUserRooms?.filter((room) =>
      room.name.toLowerCase().includes(searchValue)
    );
    setSearchRoomList(searchedRoomArray);
  };

  return (
    <div className="main-contantSection_Phone">
      <div className="Continer-RoomSearchBox-contantSection_Phone">
        <div className="recentWord-contantSection_Phone"> Recent </div>
        <input
          className="RoomSearchBox-contantSection_Phone"
          onChange={(e) =>
            updateRoomBySearch(e.target.value.trim().toLowerCase())
          }
          type={"search"}
          list="rooms"
          placeholder="Search Room..."
        />
      </div>

      <div className="contactList-contactSection_Phone">
        {searchRoomList?.map((oneRoom: roomType, index) => {
          return <OneContact key={index} oneRoom={oneRoom} />;
        })}

        {searchRoomList != undefined &&
          allUserRooms &&
          searchRoomList?.length < 1 &&
          (allUserRooms?.length > 0 ? (
            <div className="NoMatchingRoomsWereFound_Phone">
              {" "}
              No Matching Rooms Were Found{" "}
            </div>
          ) : (
            <div className="NoMatchingRoomsWereFound_Phone">
              {" "}
              Your Room List Empty{" "}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ContactWindow_Phone;
