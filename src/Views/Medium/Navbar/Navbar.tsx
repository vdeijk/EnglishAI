import { Link } from "react-router";
import styles from "./Navbar.module.css";
import { FaUser } from "react-icons/fa";
import SidebarScore from "../../Small/SidebarScore/SidebarScore";
import scoreStore from "../../../Stores/ScoreStore";
import { observer } from "mobx-react";

const Navbar = observer(() => {
  return (
    <div className={styles.navbar}>
      <SidebarScore
        totalScore={scoreStore.totalScore}
        todayScore={scoreStore.todayScore}
        targetScore={scoreStore.targetScore}
      />
      <Link to="/profile" className={styles.profileLink}>
        <FaUser className={styles.icon} />
        Profile
      </Link>
    </div>
  );
});

export default Navbar;
