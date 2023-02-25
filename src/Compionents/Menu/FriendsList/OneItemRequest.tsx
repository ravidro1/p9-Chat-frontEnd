import { useContext } from "react";
import { socket } from "../../../App";
import { DataContext } from "../../../Contexts/DataContextProvider";
import { TypeDataContext, userType } from "../../../types";

interface props {
  user: userType;
}

const OneItemRequest: React.FC<props> = ({ user }) => {
  const { currentUser, setCurrentUser } = useContext(
    DataContext
  ) as TypeDataContext;

  const confirmAndDenyFriendshipRequest = (
    user: userType,
    isConfirmOrDeny: boolean
  ) => {
    socket.emit(
      "transmit-acceptFriendshipRequest",
      isConfirmOrDeny,
      currentUser?._id,
      user._id,

      () => {
        if (currentUser) {
          if (isConfirmOrDeny) {
            setCurrentUser({
              ...currentUser,
              friendsList: [...currentUser.friendsList, user._id],
              FriendRequestsSentToUserInPending: [
                ...currentUser.FriendRequestsSentToUserInPending.filter(
                  (item) => item != user._id
                ),
              ],
            });
          } else {
            setCurrentUser({
              ...currentUser,
              FriendRequestsSentToUserInPending: [
                ...currentUser.FriendRequestsSentToUserInPending.filter(
                  (item) => item != user._id
                ),
              ],
            });
          }
        }
      }
    );
  };

  return (
    <>
      <div>{user.username}</div>
      <div className="requestButtons-continer-FriendsListWindow">
        <div
          className="requestButtons-FriendsListWindow"
          style={{ backgroundColor: "red", width: "45%", cursor: "pointer" }}
          onClick={() => confirmAndDenyFriendshipRequest(user, false)}
        >
          Deny
        </div>
        <div
          className="requestButtons-FriendsListWindow"
          style={{ backgroundColor: "green", width: "45%", cursor: "pointer" }}
          onClick={() => confirmAndDenyFriendshipRequest(user, true)}
        >
          Confirm
        </div>
      </div>
    </>
  );
};

export default OneItemRequest;
