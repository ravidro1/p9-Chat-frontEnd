import "../Style/menuIcon.css";

interface Props {
  height: string;
  classes?: string;
}

const MenuIcon: React.FC<Props> = ({
  height,
  classes,
}) => {
  return (
    <div
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
