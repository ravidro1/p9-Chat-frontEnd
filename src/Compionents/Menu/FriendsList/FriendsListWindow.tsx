import {useContext, useEffect, useState} from "react";
import {DataContext} from "../../../Contexts/DataContextProvider";
import "../../../Style/friendsListWindow.css";
import {TypeDataContext, userType} from "../../../types";
import ItemsBlock from "./ItemsBlock";
import OneItemOfAllUser from "./OneItemOfAllUser";
import OneItemRequest from "./OneItemRequest";

interface Props {
  animationClass: string;

  showFriendsListWindow: boolean | null;
}

const FriendsListWindow: React.FC<Props> = ({
  animationClass,
  showFriendsListWindow,
}) => {
  const {windowWidthForPhone, usersList, allUserFriends, currentUser} =
    useContext(DataContext) as TypeDataContext;

  const [searchTextAllUser, setSearchTextAllUser] = useState<string>("");
  const [searchTextFriendsList, setSearchTextFriendsList] =
    useState<string>("");
  const [searchTextRequestList, setSearchTextRequestList] =
    useState<string>("");

  useEffect(() => {
    setSearchTextAllUser("");
    setSearchTextFriendsList("");
    setSearchTextRequestList("");
  }, [showFriendsListWindow]);

  return (
    <div
      className={"continer-createRoomOrFriendsListOrSettings " + animationClass}
    >
      <div className="ItemsBlocksArea-FriendsListWindow">
        <ItemsBlock
          searchText={searchTextAllUser}
          setSearchText={setSearchTextAllUser}
          placeholderText={"Search User..."}
        >
          {usersList?.map((user, index) => {
            if (
              !allUserFriends?.some((item) => item._id == user._id) &&
              user._id != currentUser?._id &&
              user.username
                .toLocaleLowerCase()
                .includes(String(searchTextAllUser))
            ) {
              return (
                <div key={index} className="main-FriendsListWindow">
                  <OneItemOfAllUser
                    user={user}
                    RequestHasAlreadyBeenSentToUser={currentUser?.FriendRequestsSentToUserInPending.some(
                      (item) => item == user._id
                    )}
                    RequestHasAlreadyBeenSentByUser={currentUser?.FriendRequestsSentFromUserInPending.some(
                      (item) => item == user._id
                    )}
                    RequestHasAlreadyBeenDeny={currentUser?.FriendRequestsUserSentThatDeny.some(
                      (item) => item == user._id
                    )}
                  />
                </div>
              );
            }
          })}
        </ItemsBlock>

        <ItemsBlock
          searchText={searchTextFriendsList}
          setSearchText={setSearchTextFriendsList}
          placeholderText={"Search Friend..."}
        >
          {usersList?.map((user, index) => {
            if (
              allUserFriends?.some((item) => item._id == user._id) &&
              user._id != currentUser?._id &&
              user.username
                .toLocaleLowerCase()
                .includes(String(searchTextFriendsList))
            ) {
              return (
                <div key={index} className="main-FriendsListWindow">
                  <div> {user.username} </div>
                </div>
              );
            }
          })}
        </ItemsBlock>

        <ItemsBlock
          searchText={searchTextRequestList}
          setSearchText={setSearchTextRequestList}
          placeholderText={"Search Request..."}
        >
          {currentUser?.FriendRequestsSentToUserInPending?.map(
            (user, index) => {
              const findUser = usersList?.find((item) => {
                return item._id == user;
              });

              if (
                findUser &&
                findUser.username
                  .toLocaleLowerCase()
                  .includes(String(searchTextRequestList))
              ) {
                return (
                  <div key={index} className="main-FriendsListWindow">
                    <OneItemRequest user={findUser} />
                  </div>
                );
              }
            }
          )}
        </ItemsBlock>
      </div>
    </div>
  );
};

export default FriendsListWindow;
