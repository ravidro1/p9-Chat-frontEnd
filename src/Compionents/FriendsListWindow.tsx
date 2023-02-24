import react, {useContext} from "react";
import {socket} from "../App";
import {DataContext} from "../Contexts/DataContextProvider";
import FriendsListWindow_Phone from "../Phone/FriendsListWindow_Phone";
import "../Style/friendsListWindow.css";
import {TypeDataContext, userType} from "../types";

interface Props {
  animationClass: string;
}

const FriendsListWindow: React.FC<Props> = ({animationClass}) => {
  const {
    windowWidthForPhone,
    usersList,
    allUserFriends,
    currentUser,
    setCurrentUser,
  } = useContext(DataContext) as TypeDataContext;

  const OneItemOfAllUser = (
    user: userType,
    RequestHasAlreadyBeenSentByUser: boolean | undefined,
    RequestHasAlreadyBeenSentToUser: boolean | undefined,
    RequestHasAlreadyBeenDeny: boolean | undefined
  ) => {
    return (
      <>
        <div>{user.username}</div>
        <div
          style={{
            color: RequestHasAlreadyBeenSentByUser
              ? "blue"
              : RequestHasAlreadyBeenSentToUser
              ? "blue"
              : RequestHasAlreadyBeenDeny
              ? "darkgray"
              : "green",
          }}
          onClick={() => {
            if (!RequestHasAlreadyBeenSentToUser) {
              sendFriendshipRequest(user);
            }
          }}
        >
          {RequestHasAlreadyBeenSentByUser
            ? "Pending"
            : RequestHasAlreadyBeenSentToUser
            ? "Already Sent To You"
            : RequestHasAlreadyBeenDeny
            ? "Request Has Already Been Rejected, Do You Want To Send Again?"
            : "Send Request"}
        </div>
      </>
    );
  };

  const OneItemOfAllFriends = (user: userType) => {
    return (
      <>
        <div>{user.username}</div>
      </>
    );
  };

  const OneItemRequest = (user: userType) => {
    return (
      <>
        <div>{user.username}</div>
        <div
          style={{color: "red"}}
          onClick={() => confirmAndDenyFriendshipRequest(user, false)}
        >
          Deny
        </div>
        <div
          style={{color: "green"}}
          onClick={() => confirmAndDenyFriendshipRequest(user, true)}
        >
          Confirm
        </div>
      </>
    );
  };

  const sendFriendshipRequest = (user: userType) => {
    socket.emit(
      "transmit-sendFriendshipRequest",
      currentUser?._id,
      user._id,
      (newRequest: string) => {
        if (currentUser)
          setCurrentUser({
            ...currentUser,
            FriendRequestsSentFromUserInPending: [
              ...currentUser.FriendRequestsSentFromUserInPending,
              newRequest,
            ],

          });
      }
    );
  };

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
      {windowWidthForPhone ? (
        <FriendsListWindow_Phone animationClass={animationClass} />
      ) : (
        <div className={"continer-createRoomOrFriendsList " + animationClass}>
          <div className="FriendsListwindowArea-FriendsListWindow">
            <div className=" blocks-FriendsListWindow">
              <input
                className="inputs-FriendsListWindow"
                type="text"
                placeholder="Search User"
              />
              <div className="itemsArea-FriendsListWindow">
                {usersList?.map((user, index) => {
                  if (
                    !allUserFriends?.some((item) => item._id == user._id) &&
                    user._id != currentUser?._id
                  ) {
                    return (
                      <div key={index} className="main-OneItemComponent">
                        {/* <>
                          {console.log(
                            currentUser?.FriendRequestsSentFromUserInPending.some(
                              (item) => item == user._id
                            )
                          )}{" "}
                        </> */}

                        {OneItemOfAllUser(
                          user,
                          currentUser?.FriendRequestsSentFromUserInPending.some(
                            (item) => item == user._id
                          ),

                          currentUser?.FriendRequestsSentToUserInPending.some(
                            (item) => item == user._id
                          ),

                          currentUser?.FriendRequestsUserSentThatDeny.some(
                            (item) => item == user._id
                          )
                        )}
                      </div>
                    );
                  }
                })}
              </div>
            </div>

            <div className="blocks-FriendsListWindow">
              <input
                className="inputs-FriendsListWindow"
                type="text"
                placeholder="Search Friend"
              />
              <div className="itemsArea-FriendsListWindow">
                {usersList?.map((user, index) => {
                  if (
                    allUserFriends?.some((item) => item._id == user._id) &&
                    user._id != currentUser?._id
                  ) {
                    return (
                      <div key={index} className="main-OneItemComponent">
                        {OneItemOfAllFriends(user)}
                      </div>
                    );
                  }
                })}
              </div>
            </div>

            <div className="blocks-FriendsListWindow">
              <input
                className="inputs-FriendsListWindow"
                type="text"
                placeholder="Search Request"
              />
              <div className="itemsArea-FriendsListWindow">
                {currentUser?.FriendRequestsSentToUserInPending?.map(
                  (user, index) => {
                    const findUser = usersList?.find((item) => {
                      return item._id == user;
                    });

                    if (findUser) {
                      return (
                        <div key={index} className="main-OneItemComponent">
                          {OneItemRequest(findUser)}
                        </div>
                      );
                    }
                  }
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FriendsListWindow;
