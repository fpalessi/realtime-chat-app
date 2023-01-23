import Video from "/Icons/video.png";
import User from "/Icons/user.png";
import Dots from "/Icons/more.png";

import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import styles from "./Chat.module.scss";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className={styles.chat}>
      <div className={styles.chatInfo}>
        <span>{data.user.displayName}</span>
        <div className={styles.chatIcons}>
          <img src={Video} alt="" />
          <img src={User} alt="" />
          <img src={Dots} alt="" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
