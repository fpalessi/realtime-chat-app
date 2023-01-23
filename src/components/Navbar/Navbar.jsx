import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  const { dispatch, initialState } = useContext(ChatContext);

  const logOut = () => {
    signOut(auth);
    dispatch({ type: "LOG_OUT", payload: initialState });
  };

  return (
    <div className={styles.navbar}>
      <span className={styles.logo}>Real Time Chat</span>
      <div className={styles.user}>
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        {/* <button onClick={() => signOut(auth)}>Log Out</button> */}
        <button onClick={logOut}>Log Out</button>
      </div>
    </div>
  );
};

export default Navbar;
