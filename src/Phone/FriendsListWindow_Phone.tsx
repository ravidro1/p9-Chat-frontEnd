import react from "react";

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
