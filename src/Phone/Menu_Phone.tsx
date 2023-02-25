import { useContext, useEffect, useState } from "react";
import CreateRoom from "../Compionents/Menu/CreateRoom";
import FriendsListWindow from "../Compionents/Menu/FriendsList/FriendsListWindow";
import MenuIcon from "../Compionents/Menu/MenuIcon";
import { FunctionContext } from "../Contexts/FunctionsContextProvider";
import { TypeFunctionsContext } from "../types";

import "./Phone_Style/menu_Phone.css";

interface Props {
  // classes: string;
  showMenu: boolean | null;
  setShowMenu: (state: boolean) => void;

  clickParent: (event: React.MouseEvent) => void;
  showNewRoomWindow: boolean | null;
  setShowNewRoomWindow: (value: React.SetStateAction<boolean | null>) => void;
  turnOffTheOtherButtons: (thisButton: string) => void;
  showFriendsListWindow: boolean | null;
}

const Menu_Phone: React.FC<Props> = ({
  showMenu,
  setShowMenu,
  clickParent,
  showNewRoomWindow,
  setShowNewRoomWindow,
  turnOffTheOtherButtons,
  showFriendsListWindow,
}) => {
  const { logout } = useContext(FunctionContext) as TypeFunctionsContext;

  return (
    <>
      <div
        onClick={(e) => {
          clickParent(e);
        }}
        className={
          "main-menu_Phone " +
          (showMenu != null
            ? showMenu
              ? "main-menuIn-Animation"
              : "main-menuOut-Animation"
            : "")
        }
      >
        <div data-value="parent" className="createRoomOrFriendsList-menu_Phone">
          <CreateRoom
            animationClass={
              showNewRoomWindow != null
                ? showNewRoomWindow
                  ? "slide-fwd-center"
                  : "slide-bck-center"
                : ""
            }
            showMenu={showMenu}
            setShowMenu={setShowMenu}
          />
          <FriendsListWindow
            animationClass={
              showFriendsListWindow != null
                ? showFriendsListWindow
                  ? "slide-fwd-center"
                  : "slide-bck-center"
                : ""
            }
            showFriendsListWindow={showFriendsListWindow}
          />
        </div>
      </div>

      <div
        className={
          "menuWindow-menu_Phone " +
          (showMenu != null ? (showMenu ? "slide-left" : "slide-right") : "")
        }
      >
        <div className="menuIconContiner-menu_Phone">
          <div
            onClick={() => {
              showMenu ? setShowMenu(!showMenu) : setShowMenu(true);
            }}
          >
            <MenuIcon height="25px" classes="rotete" />
          </div>
        </div>

        <button
          onClick={() => {
            // setShowMenu(false);
            turnOffTheOtherButtons("newRoom");
          }}
        >
          new room
        </button>
        <br />
        <button
          onClick={() => {
            turnOffTheOtherButtons("friendsList");
          }}
        >
          friends list
        </button>

        <div> settings </div>

        <button className="logoutButton-menu_Phone" onClick={logout}>
          Logout
        </button>
      </div>
    </>
  );
};

export default Menu_Phone;
