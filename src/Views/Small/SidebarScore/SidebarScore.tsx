import React from 'react';
import styles from './SidebarScore.module.css';

interface ScoreCardProps {
  score: number;
}

const SidebarScore: React.FC<ScoreCardProps> = ({ score }) => {
  return (
    <div className={styles.scoreCard}>
      <p>Score: {score}</p>
    </div>
  );
};

export default SidebarScore;