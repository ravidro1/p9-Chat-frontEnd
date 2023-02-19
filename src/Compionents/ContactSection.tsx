import react, {useState, useEffect, useContext} from "react";
import {roomType, TypeDataContext} from "../types";
import "../Style/contantSection.css";
import OneContact from "./OneContact";
import {DataContext} from "../Contexts/DataContextProvider";

interface Props {}

const ContactWindow: React.FC<Props> = () => {
  const {allUserRooms, currentRoom, setCurrentRoom} = useContext(
    DataContext
  ) as TypeDataContext;

  const [searchRoomList, setSearchRoomList] = useState<
    roomType[] | undefined
  >();

  useEffect(() => {
    setSearchRoomList(allUserRooms);
    console.log(allUserRooms);

    if (currentRoom) {
      setCurrentRoom(
        allUserRooms?.find((room) => room._id == currentRoom?._id)
      );
    }
  }, [allUserRooms]);

  const updateRoomBySearch = (searchValue: string) => {
    const searchedRoomArray = allUserRooms?.filter((room) =>
      room.name.includes(searchValue)
    );
    setSearchRoomList(searchedRoomArray);
  };

  return (
    <div className="main-contantSection">
      <div className="Continer-RoomSearchBox-contantSection">
        <div className="recentWord-contantSection"> Recent </div>
        <input
          className="RoomSearchBox-contantSection"
          onChange={(e) =>
            updateRoomBySearch(e.target.value.trim().toLowerCase())
          }
          type={"search"}
          list="rooms"
          placeholder="Search Room..."
        />
      </div>

      <div className="contactList-contactSection">
        {searchRoomList?.map((oneRoom: roomType, index) => {
          return <OneContact key={index} oneRoom={oneRoom} />;
        })}

        {searchRoomList != undefined && searchRoomList?.length < 1 && (
          <> !room </>
        )}
      </div>
    </div>
  );
};

export default ContactWindow;
