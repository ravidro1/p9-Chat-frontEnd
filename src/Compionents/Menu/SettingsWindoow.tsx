import react, {useContext, useEffect, useState} from "react";
import {TypeDataContext} from "../../types";
import "../../Style/settingsWindow.css";
import axios from "axios";
import {DataContext} from "../../Contexts/DataContextProvider";

interface Props {
  animationClass: string;

  showSettingsWindow: boolean | null;
}

const SettingsWindow: React.FC<Props> = ({
  animationClass,

  showSettingsWindow,
}) => {
  const {currentUser} = useContext(DataContext) as TypeDataContext;

  const [newPassword, setNewPassword] = useState<string>("");
  const [newPasswordVetify, setNewPasswordVerify] = useState<string>("");

  const [isValidPassword, setIsValidPassword] = useState<boolean>(false);

  const [changePasswordNotification, setChangePasswordNotification] = useState<{
    text: string;
    color: string;
  }>({text: "", color: ""});

  const [buttonStyle, setButtonStyle] = useState<react.CSSProperties>({
    cursor: "default",
    color: "rgba(0, 0, 0, 0.425)",
  });

  useEffect(() => {
    setNewPassword("");
    setNewPasswordVerify("");
    setIsValidPassword(false);
    setChangePasswordNotification({text: "", color: ""});
    setButtonStyle({
      cursor: "default",
      color: "rgba(0, 0, 0, 0.425)",
    });
    console.log(showSettingsWindow);
  }, [showSettingsWindow]);

  const changePassword = () => {
    console.log("click");

    axios
      .post(`${process.env.REACT_APP_EXPRESS_PORT}/ChangePassword`, {
        userID: currentUser?._id,
        password: newPassword,
      })
      .then((res) => {
        // console.log(res.data);
        setChangePasswordNotification({
          text: "Password Has Been Successfully Changed",
          color: "green",
        });
      })
      .catch((err) => {
        console.log(err);

        setChangePasswordNotification({
          text: "Change Failed Password Please Try Again",
          color: "red",
        });
      });

    setNewPassword("");
    setNewPasswordVerify("");
  };

  useEffect(() => {
    if (newPassword === newPasswordVetify && newPassword.length >= 8) {
      setButtonStyle({
        cursor: "pointer",
        backgroundColor: "#05728f",
      });
      setIsValidPassword(true);
    } else {
      setButtonStyle({
        cursor: "default",
        backgroundColor: "#92bbc7",
      });
      setIsValidPassword(false);
    }
  }, [newPassword, newPasswordVetify]);

  return (
    <>
      <div
        className={
          "continer-createRoomOrFriendsListOrSettings " + animationClass
        }
      >
        <div className="settingsWindowArea-SettingsWindow">
          <div className="ChangePassword-HeadLine-SettingsWindow">
            Change Password
          </div>
          <div className="ChangePassword-InputsArea-SettingsWindow">
            <input
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="ChangePassword-Inputs-SettingsWindow"
              placeholder="New Password"
            />
            <input
              value={newPasswordVetify}
              onChange={(e) => setNewPasswordVerify(e.target.value)}
              className="ChangePassword-Inputs-SettingsWindow"
              placeholder="Verify New Password"
            />
          </div>

          <div
            className="successOrFailText-SettingsWindow"
            style={{color: changePasswordNotification.color}}
          >
            {changePasswordNotification.text}
          </div>

          <div
            onClick={isValidPassword ? changePassword : () => {}}
            style={buttonStyle}
            className="ChangePassword-Button-SettingsWindow"
          >
            Change
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsWindow;
