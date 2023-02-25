import react, {useState, useEffect, useContext} from "react";
import {roomType, TypeDataContext} from "../types";
import {DataContext} from "../Contexts/DataContextProvider";

import "./Phone_Style/contantSection_Phone.css";
import OneContact from "../Compionents/ContactWindow/OneContact";

interface Props {
  updateRoomBySearch: (searchValue: string) => void;
  searchRoomList: roomType[] | undefined;
}

const ContactWindow_Phone: React.FC<Props> = ({
  updateRoomBySearch,
  searchRoomList,
}) => {
  const {allUserRooms} = useContext(DataContext) as TypeDataContext;

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
