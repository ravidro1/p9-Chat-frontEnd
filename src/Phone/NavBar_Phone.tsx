import {useContext, useState} from "react";
import MenuIcon from "../Compionents/MenuIcon";
import {DataContext} from "../Contexts/DataContextProvider";
import "./navBar_Phone.css";
import {TypeDataContext} from "../types";
import Menu_Phone from "./Menu_Phone";

interface Props {}

const NavBar_Phone: React.FC<Props> = () => {
  const {} = useContext(DataContext) as TypeDataContext;

  const [showMenu, setShowMenu] = useState<boolean | null>(null);

  return (
    <div className="main-NavBar_Phone">
      <img className="logo-NavBar_Phone" src="RaviChat.png" alt="logo" />

      {showMenu != null && (
        <Menu_Phone showMenu={showMenu} setShowMenu={setShowMenu} />
      )}

      <div
        className="menuIconContiner-navBar_Phone"
        onClick={() => {
          showMenu ? setShowMenu(!showMenu) : setShowMenu(true);
        }}
      >
        <MenuIcon height="30px" />
      </div>
    </div>
  );
};

export default NavBar_Phone;
