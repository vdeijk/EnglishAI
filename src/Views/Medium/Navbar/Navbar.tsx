import { Link } from "react-router";
import styles from "./Navbar.module.css";
import { FaUser } from "react-icons/fa";
import SidebarScore from "../../Small/SidebarScore/SidebarScore";
import scoreStore from "../../../Stores/ScoreStore";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.scoreContainer}>
        <SidebarScore
          totalScore={scoreStore.totalScore}
          todayScore={scoreStore.todayScore}
        />
      </div>
      <Link to="/profile" className={styles.profileLink}>
        <FaUser className={styles.icon} />
        Profile
      </Link>
    </div>
  );
};

export default Navbar;
