import React from "react";
import styles from "./Card.module.css";

interface CardProps {
  icon: React.ReactNode;
  name: string;
  onClick?: () => void | Promise<void>;
}

const Card: React.FC<CardProps> = ({ icon, name, onClick }) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <h3 className={styles.h4}>{name}</h3>
      <div className={styles.icon}>{icon}</div>
    </div>
  );
};

export default Card;
