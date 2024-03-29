import {useContext, useState} from "react";
import {DataContext} from "../Contexts/DataContextProvider";
import "../Style/navBar.css";
import {TypeDataContext} from "../types";
import Menu from "./Menu/Menu";
import MenuIcon from "./Menu/MenuIcon";

interface Props {}

const NavBar: React.FC<Props> = () => {
  const {windowWidthForPhone} = useContext(DataContext) as TypeDataContext;

  const [showMenu, setShowMenu] = useState<boolean | null>(null);

  return (
    <div className="main-NavBar">
      <img className="logo-NavBar" src="RaviChat.png" alt="logo" />

      {showMenu != null && (
        <Menu showMenu={showMenu} setShowMenu={setShowMenu} />
      )}

      <div
        className="menuIconContiner-navBar"
        onClick={() => {
          showMenu ? setShowMenu(!showMenu) : setShowMenu(true);
        }}
      >
        <MenuIcon height="35px" />
      </div>
    </div>
  );
};

export default NavBar;
