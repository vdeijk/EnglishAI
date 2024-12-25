import Button from "../../Small/Button/Button";
import { Link } from "react-router";
import styles from "./Navbar.module.css";
import { FaUser, FaStar } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div></div>
      <Button
        label="Upgrade now"
        onClick={() => {}}
        type="button"
        disabled={false}
        icon={<FaStar />}
      />
      <Link to="/profile" className={styles.profileLink}>
        <FaUser className={styles.icon} />
        Profile
      </Link>
    </div>
  );
};

export default Navbar;
