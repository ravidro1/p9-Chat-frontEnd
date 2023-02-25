import { useContext, useState, useEffect } from "react";
import { socket } from "../../../App";
import { DataContext } from "../../../Contexts/DataContextProvider";
import { TypeDataContext, userType } from "../../../types";

interface Props {
  user: userType;
  RequestHasAlreadyBeenSentByUser: boolean | undefined;
  RequestHasAlreadyBeenSentToUser: boolean | undefined;
  RequestHasAlreadyBeenDeny: boolean | undefined;
}

const OneItemOfAllUser: React.FC<Props> = ({
  user,
  RequestHasAlreadyBeenSentByUser,
  RequestHasAlreadyBeenSentToUser,
  RequestHasAlreadyBeenDeny,
}) => {
  const { currentUser, setCurrentUser } = useContext(
    DataContext
  ) as TypeDataContext;

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

  const [textStyle, setTextStyle] = useState<React.CSSProperties>({
    backgroundColor: RequestHasAlreadyBeenSentByUser
      ? "blue"
      : RequestHasAlreadyBeenSentToUser
      ? "blue"
      : RequestHasAlreadyBeenDeny
      ? "darkgray"
      : "green",
  });

  const [textContent, setTextContent] = useState<string>(
    RequestHasAlreadyBeenSentByUser
      ? "Pending"
      : RequestHasAlreadyBeenSentToUser
      ? "Already Sent To You"
      : RequestHasAlreadyBeenDeny
      ? "Request Rejected, Send Again"
      : "Send Request"
  );

  useEffect(() => {
    setTextStyle({
      backgroundColor: RequestHasAlreadyBeenSentByUser
        ? "blue"
        : RequestHasAlreadyBeenSentToUser
        ? "blue"
        : RequestHasAlreadyBeenDeny
        ? "darkgray"
        : "green",

      cursor: RequestHasAlreadyBeenSentByUser
        ? "default"
        : RequestHasAlreadyBeenSentToUser
        ? "default"
        : RequestHasAlreadyBeenDeny
        ? "pointer"
        : "pointer",
    });

    setTextContent(
      RequestHasAlreadyBeenSentByUser
        ? "Pending"
        : RequestHasAlreadyBeenSentToUser
        ? "Already Sent To You"
        : RequestHasAlreadyBeenDeny
        ? "Request Rejected, Send Again"
        : "Send Request"
    );
  }, [
    RequestHasAlreadyBeenSentByUser,
    RequestHasAlreadyBeenSentToUser,
    RequestHasAlreadyBeenDeny,
  ]);

  return (
    <>
      <div>{user.username}</div>
      <div className="requestButtons-continer-FriendsListWindow">
        <div
          className="requestButtons-FriendsListWindow"
          style={textStyle}
          onClick={() => {
            if (!RequestHasAlreadyBeenSentToUser) {
              sendFriendshipRequest(user);
            }
          }}
        >
          {textContent}
        </div>
      </div>
    </>
  );
};

export default OneItemOfAllUser;
