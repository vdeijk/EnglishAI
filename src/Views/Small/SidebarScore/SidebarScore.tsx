import React from "react";
import { FaSmile, FaFrown } from "react-icons/fa";
import styles from "./SidebarScore.module.css";

interface SidebarScoreProps {
  totalScore: number;
  todayScore: number;
  targetScore: number;
}

const SidebarScore: React.FC<SidebarScoreProps> = ({
  totalScore,
  todayScore,
  targetScore,
}) => {
  const icon =
    todayScore > targetScore ? (
      <FaSmile className={styles.icon} />
    ) : (
      <FaFrown className={styles.icon} />
    );

  return (
    <div className={styles.scoreCard}>
      <div className={styles.scoreItem}>
        <span className={styles.label}>All Time:</span>
        <span className={styles.value}>&nbsp;{totalScore}</span>
      </div>
      <div className={styles.scoreItem}>
        <span className={styles.label}>Today:</span>
        <span className={styles.value}>&nbsp;{todayScore}</span>
      </div>
      <div className={styles.scoreItem}>
        <span className={styles.label}>Target:</span>
        <span className={styles.value}>&nbsp;{targetScore}</span>
      </div>
      <div className={styles.scoreItem}>{icon}</div>
      <div className={styles.scoreItem}>
        <a href="/see-more" className={styles.seeMore}>
          See more
        </a>
      </div>
    </div>
  );
};

export default SidebarScore;
