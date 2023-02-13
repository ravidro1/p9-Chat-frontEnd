import {useContext, useEffect, useState} from "react";
import {FunctionContext} from "../Contexts/FunctionsContextProvider";
import "../Style/menu.css";
import {TypeFunctionsContext} from "../types";
import CreateRoom from "./CreateRoom";
import MenuIcon from "./MenuIcon";

interface Props {
  // classes: string;
  showMenu: boolean | null;
  setShowMenu: (state: boolean) => void;
}

const NavBarOption: React.FC<Props> = ({showMenu, setShowMenu}) => {
  const {logout} = useContext(FunctionContext) as TypeFunctionsContext;

  const [showNewRoomWindow, setShowNewRoomWindow] = useState<boolean | null>(
    false
  );

  useEffect(() => {
    if (!showMenu) setShowNewRoomWindow(false);
  }, [showMenu]);

  const clickParent = (event: React.MouseEvent) => {
    event.preventDefault();
    let dataValue = (event.target as HTMLElement).getAttribute("data-value");
    if (dataValue == "parent") {
      console.log("parent clicked");
      setShowMenu(false);
      setShowNewRoomWindow(false);
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
          "main-menu " +
          (showMenu != null
            ? showMenu
              ? "main-menuIn-Animation"
              : "main-menuOut-Animation"
            : "")
        }
      >
        <div data-value="parent" className="areaOfCreateRoom-menu">
          {showNewRoomWindow && <CreateRoom   setShowMenu={setShowMenu}
 />}
        </div>
      </div>

      <div
        className={
          "menuWindow-menu " +
          (showMenu != null ? (showMenu ? "slide-left" : "slide-right") : "")
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
            // setShowMenu(false);
            setShowNewRoomWindow(!showNewRoomWindow);
          }}
        >
          new room
        </button>

        <div> my friends </div>
        <div> settings </div>
        <button className="logoutButton-menu" onClick={logout}>
          Logout
        </button>
      </div>
    </>
  );
};

export default NavBarOption;
