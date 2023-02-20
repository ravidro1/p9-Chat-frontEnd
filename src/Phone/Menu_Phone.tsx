import {useContext, useEffect, useState} from "react";
import MenuIcon from "../Compionents/MenuIcon";
import {FunctionContext} from "../Contexts/FunctionsContextProvider";
import {TypeFunctionsContext} from "../types";
import CreateRoom_Phone from "./CreateRoom_Phone";

import "./menu_Phone.css";

interface Props {
  // classes: string;
  showMenu: boolean | null;
  setShowMenu: (state: boolean) => void;
}

const Menu_Phone: React.FC<Props> = ({showMenu, setShowMenu}) => {
  const {logout} = useContext(FunctionContext) as TypeFunctionsContext;

  const [showNewRoomWindow, setShowNewRoomWindow] = useState<boolean | null>(
    null
  );

  useEffect(() => {
    if (!showMenu && showNewRoomWindow) {
      setShowNewRoomWindow(false);
    }
  }, [showMenu]);

  const clickParent = (event: React.MouseEvent) => {
    event.preventDefault();
    let dataValue = (event.target as HTMLElement).getAttribute("data-value");
    if (dataValue == "parent") {
      console.log("parent clicked");
      setShowMenu(false);
      // setShowNewRoomWindow(null);
    } else {
      console.log("c");
    }
  };

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
        <div data-value="parent" className="areaOfCreateRoom-menu_Phone">
          {/* {showNewRoomWindow && ( */}
          <CreateRoom_Phone
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
          {/* )} */}
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
            setShowNewRoomWindow(!showNewRoomWindow);
          }}
        >
          new room
        </button>

        <div> my friends </div>
        <div> settings </div>
        
        <button className="logoutButton-menu_Phone" onClick={logout}>
          Logout
        </button>
      </div>
    </>
  );
};

export default Menu_Phone;
