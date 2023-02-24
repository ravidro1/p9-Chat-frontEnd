import {useContext, useEffect, useState} from "react";
import {DataContext} from "../Contexts/DataContextProvider";
import {FunctionContext} from "../Contexts/FunctionsContextProvider";
import Menu_Phone from "../Phone/Menu_Phone";
import "../Style/menu.css";
import {TypeDataContext, TypeFunctionsContext} from "../types";
import CreateRoom from "./CreateRoom";
import FriendsListWindow from "./FriendsListWindow";
import MenuIcon from "./MenuIcon";

interface Props {
  // classes: string;
  showMenu: boolean | null;
  setShowMenu: (state: boolean) => void;
}

const NavBarOption: React.FC<Props> = ({showMenu, setShowMenu}) => {
  const {logout} = useContext(FunctionContext) as TypeFunctionsContext;
  const {windowWidthForPhone} = useContext(DataContext) as TypeDataContext;
  const [showNewRoomWindow, setShowNewRoomWindow] = useState<boolean | null>(
    null
  );
  const [showFriendsListWindow, setShowFriendsListWindow] = useState<
    boolean | null
  >(null);

  useEffect(() => {
    if (!showMenu && showNewRoomWindow) {
      setShowNewRoomWindow(false);
    }
    if (!showMenu && showFriendsListWindow) {
      setShowFriendsListWindow(false);
    }
  }, [showMenu]);

  const clickParent = (event: React.MouseEvent) => {
    event.preventDefault();
    let dataValue = (event.target as HTMLElement).getAttribute("data-value");
    if (dataValue == "parent") {
      console.log("parent clicked");
      setShowMenu(false);
    } else {
      console.log("c");
    }
  };

  const turnOffTheOtherButtons = (thisButton: string) => {
    if (thisButton == "friendsList") {
      if (showNewRoomWindow) setShowNewRoomWindow(false);
      if (showFriendsListWindow) setShowFriendsListWindow(false);
      else setShowFriendsListWindow(true);
    } else if (thisButton == "newRoom") {
      if (showFriendsListWindow) setShowFriendsListWindow(false);
      if (showNewRoomWindow) setShowNewRoomWindow(false);
      else setShowNewRoomWindow(true);
    }
  };

  return (
    <>
      {windowWidthForPhone ? (
        <Menu_Phone
          clickParent={clickParent}
          setShowMenu={setShowMenu}
          setShowNewRoomWindow={setShowNewRoomWindow}
          showMenu={showMenu}
          showNewRoomWindow={showNewRoomWindow}
          showFriendsListWindow={showFriendsListWindow}
          turnOffTheOtherButtons={turnOffTheOtherButtons}
        />
      ) : (
        <>
          <div
            onClick={(e) => {
              clickParent(e);
            }}
            className={
              "main-menu " +
              (showMenu != null
                ? showMenu
                  ? "main-menuIn-Animation"
                  : "main-menuOut-Animation"
                : "")
            }
          >
            <div data-value="parent" className="createRoomOrFriendsList-menu">
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
              />
            </div>
          </div>

          <div
            className={
              "menuWindow-menu " +
              (showMenu != null
                ? showMenu
                  ? "slide-left"
                  : "slide-right"
                : "")
            }
          >
            <div className="menuIconContiner-menu">
              <div
                onClick={() => {
                  showMenu ? setShowMenu(!showMenu) : setShowMenu(true);
                }}
              >
                <MenuIcon height="35px" classes="rotete" />
              </div>
            </div>

            <button
              onClick={() => {
                turnOffTheOtherButtons("newRoom");
              }}
            >
              new room
            </button>

            <button
              onClick={() => {
                turnOffTheOtherButtons("friendsList");
              }}
            >
              friends list
            </button>
            <div> settings </div>
            <button className="logoutButton-menu" onClick={logout}>
              Logout
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default NavBarOption;
