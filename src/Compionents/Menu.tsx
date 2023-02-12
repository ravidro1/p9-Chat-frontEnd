import {useContext} from "react";
import {FunctionContext} from "../Contexts/FunctionsContextProvider";
import "../Style/menu.css";
import {TypeFunctionsContext} from "../types";
import MenuIcon from "./MenuIcon";

interface Props {
  // classes: string;
  showMenu: boolean | null;
  setShowMenu: (state: boolean) => void;
}

const NavBarOption: React.FC<Props> = ({showMenu, setShowMenu}) => {
  const {logout} = useContext(FunctionContext) as TypeFunctionsContext;

  // const clickParent = (event: React.MouseEvent) => {
  //   event.preventDefault();
  //   let dataValue = (event.target as HTMLElement).getAttribute("data-value");
  //   if (dataValue !== "child") {
  //     setShowMenu(!showMenu);
  //     console.log("parent clicked");
  //   }
  // };

  return (
    <>
      <div
        onClick={() => setShowMenu(false)}
        className={
          "main-menu " +
          (showMenu != null
            ? showMenu
              ? "main-menuIn-Animation"
              : "main-menuOut-Animation"
            : "")
        }
      />

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

        <div> new room </div>
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
