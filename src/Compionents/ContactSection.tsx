import react, {useState, useEffect, useContext} from "react";
import {roomType, TypeDataContext} from "../types";
import "../Style/contantSection.css";
import OneContact from "./OneContact";
import {DataContext} from "../Contexts/DataContextProvider";
import ContactWindow_Phone from "../Phone/ContactSection_Phone";

interface Props {}

const ContactWindow: React.FC<Props> = () => {
  const {
    allUserRooms,
    currentRoom,
    setCurrentRoom,
    windowWidthForPhone,
    allUserMessages,
  } = useContext(DataContext) as TypeDataContext;

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
    <>
      {windowWidthForPhone ? (
        <ContactWindow_Phone
          searchRoomList={searchRoomList}
          updateRoomBySearch={updateRoomBySearch}
        />
      ) : (
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

            {searchRoomList != undefined &&
              allUserRooms &&
              searchRoomList?.length < 1 &&
              (allUserRooms?.length > 0 ? (
                <div className="NoMatchingRoomsWereFound">
                  {" "}
                  No Matching Rooms Were Found{" "}
                </div>
              ) : (
                <div className="NoMatchingRoomsWereFound">
                  {" "}
                  Your Room List Empty{" "}
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ContactWindow;
