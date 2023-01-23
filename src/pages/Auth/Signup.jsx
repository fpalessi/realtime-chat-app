import Avatar from "/Icons/photo.png";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Auth.module.scss";
import Loader from "../../components/Loader/Loader";

const Signup = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      // Create user
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
        file
      );

      // Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            // Update profile
            await updateProfile(response.user, {
              displayName,
              photoURL: downloadURL,
            });
            // Create user on firestore ("users" collection)
            await setDoc(doc(db, "users", response.user.uid), {
              uid: response.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            // Create user chats ("userChats" collection) on firestore
            await setDoc(doc(db, "userChats", response.user.uid), {});
            navigate("/");
          } catch (error) {
            console.log(error);
            setError(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formWrapper}>
        <span className={styles.logo}>Real Time Chat App</span>
        <span className={styles.title}>Sign Up</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="name" required />
          <input type="email" placeholder="email" required />
          <input
            type="password"
            placeholder="password (at least 6 characters)"
            required
          />
          <label htmlFor="file" style={{ marginBottom: "-2rem" }}>
            <img src={Avatar} alt="" />
            <span> Add a Profile Image</span>
          </label>
          <input style={{ opacity: "0" }} type="file" id="file" required />
          <button disabled={loading}>Sign Up</button>
          {loading && <Loader />}{" "}
          {error && (
            <span style={{ fontSize: "15px", color: "#da4949" }}>
              Something went wrong. Try again
            </span>
          )}
          <Link
            to="/login"
            style={{
              fontSize: "15px",
              textDecoration: "none",
              color: "#7952b3",
            }}
          >
            Have an account? Login here.
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
