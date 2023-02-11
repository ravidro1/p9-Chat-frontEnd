import {useContext, useState} from "react";
import {DataContext} from "../Contexts/DataContextProvider";
import {FunctionContext} from "../Contexts/FunctionsContextProvider";
import "../Style/navBar.css";
import {TypeDataContext, TypeFunctionsContext} from "../types";
import Menu from "./Menu";
import MenuIcon from "./MenuIcon";

interface Props {}

const NavBar: React.FC<Props> = () => {
  const {} = useContext(DataContext) as TypeDataContext;

  const [showMenu, setShowMenu] = useState<boolean | null>(null);

  return (
    <div className="main-NavBar">
      <img className="logo-NavBar" src="RaviChat.png" alt="logo" />

      {/* <Menu showMenu={showMenu} setShowMenu={setShowMenu} />

      <MenuIcon
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        classes={
          showMenu != null
            ? showMenu
              ? "rotate-90-open"
              : "rotate-90-close"
            : ""
        }
        height="50%"
      /> */}
    </div>
  );
};

export default NavBar;
