import React from "react";
import ChatList from "../ChatList/ChatList";
import Navbar from "../Navbar/Navbar";
import Searchbar from "../Searchbar/Searchbar";
import styles from "./Sidebar.module.scss";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Navbar />
      <Searchbar />
      <ChatList />
    </div>
  );
};

export default Sidebar;
