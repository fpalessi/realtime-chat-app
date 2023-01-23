import Chat from "../../components/Chat/Chat";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "../Home/Home.module.scss";

const Home = () => {
  return (
    <div className={styles.home}>
      <div className={styles.container}>
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default Home;
