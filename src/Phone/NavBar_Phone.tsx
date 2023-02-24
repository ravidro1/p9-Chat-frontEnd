import {useContext, useState} from "react";
import MenuIcon from "../Compionents/MenuIcon";
import "./Phone_Style/navBar_Phone.css";
import Menu from "../Compionents/Menu";

interface Props {}

const NavBar_Phone: React.FC<Props> = () => {
  const [showMenu, setShowMenu] = useState<boolean | null>(null);

  return (
    <div className="main-NavBar_Phone">
      <img className="logo-NavBar_Phone" src="RaviChat.png" alt="logo" />

      {showMenu != null && (
        <Menu showMenu={showMenu} setShowMenu={setShowMenu} />
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
