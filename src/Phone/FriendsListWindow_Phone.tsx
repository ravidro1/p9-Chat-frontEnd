import react from "react";
import "./Phone_Style/friendsListWindow.css";

interface Props {
  animationClass: string;
}

const FriendsListWindow_Phone: React.FC<Props> = ({animationClass}) => {
  return (
    <div
      className={"continer-createRoomOrFriendsList_Phone " + animationClass}
    ></div>
  );
};

export default FriendsListWindow_Phone;
