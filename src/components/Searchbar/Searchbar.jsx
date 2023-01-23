import { useContext, useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  updateDoc,
  serverTimestamp,
  getDoc,
  doc,
} from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
import styles from "./Searchbar.module.scss";

const Searchbar = () => {
  const [displayName, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", displayName)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      setError(true);
    }
  };

  const handleKey = (e) => {
    e.code == "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create new one
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const response = await getDoc(doc(db, "chats", combinedId));

      // if response does not exist (which means: NO CHAT BETWEEN JOHN AND JANE INSIDE "CHATS" COLECTION, WE ARE GONNA CREATE ONE)
      if (!response.exists()) {
        // create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {
      console.log(error);
    }

    setUser(null);
    setUsername("");
  };

  return (
    <div className={styles.search}>
      <div className={styles.searchForm}>
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={displayName}
        />
      </div>

      {error && <span>User not found</span>}

      {user && (
        <div className={styles.search} onClick={handleSelect}>
          {" "}
          <div className={styles.userChat}>
            <img src={user.photoURL} alt="" />
            <div className={styles.userChatInfo}>
              <span>{user.displayName}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Searchbar;
