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
