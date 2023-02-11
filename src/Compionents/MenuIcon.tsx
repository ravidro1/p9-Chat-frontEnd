import "../Style/menuIcon.css";

interface Props {
  height: string;
  classes: string;
  showMenu: boolean | null;
  setShowMenu: (state: boolean) => void;
}

const MenuIcon: React.FC<Props> = ({
  height,
  classes,
  showMenu,
  setShowMenu,
}) => {
  return (
    <div
      onClick={() => {
        showMenu ? setShowMenu(!showMenu) : setShowMenu(true);
      }}
      className={"main-MenuIcon " + classes}
      style={{height}}
    >
      <div className="stripes-MenuIcon"></div>
      <div className="stripes-MenuIcon"></div>
      <div className="stripes-MenuIcon"></div>
    </div>
  );
};

export default MenuIcon;
