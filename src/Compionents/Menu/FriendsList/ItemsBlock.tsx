import { ReactNode, useState } from "react";

import "../../../Style/itemsBlock.css";

interface props {
  children: ReactNode;
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  placeholderText: string;
}

const ItemsBlock: React.FC<props> = ({
  children,
  searchText,
  setSearchText,
  placeholderText,
}) => {
  return (
    <div className=" blocks-FriendsListWindow">
      <input
        value={searchText}
        onChange={(e) =>
          setSearchText(e.target.value.trim().toLocaleLowerCase())
        }
        className="inputs-FriendsListWindow"
        type="text"
        placeholder={placeholderText}
      />
      <div className="itemsArea-FriendsListWindow">{children}</div>
    </div>
  );
};

export default ItemsBlock;
