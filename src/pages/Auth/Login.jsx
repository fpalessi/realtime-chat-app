import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import Loader from "../../components/Loader/Loader";
import styles from "./Auth.module.scss";
import { ChatContext } from "../../context/ChatContext";

const Login = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formWrapper}>
        <span className={styles.logo}>Real Time Chat App</span>
        <span className={styles.title}>Log In</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="email" required />
          <input type="password" placeholder="password" required />
          <button>Log In</button>
          {loading && <Loader />}
          {error && (
            <span style={{ fontSize: "15px", color: "#da4949" }}>
              Something went wrong. Try again
            </span>
          )}

          <Link
            to="/signup"
            style={{
              fontSize: "15px",
              textDecoration: "none",
              color: "#7952b3",
            }}
          >
            I don't have an account.
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
