import React from "react";
import styles from "./Dashboard.module.css";
import Card from "../../Medium/Card/Card";
import { useNavigate } from "react-router-dom";
import * as Icons from "react-icons/fa";
import { observer } from "mobx-react";
import navigationStore from "../../../Stores/NavigationStore";

const Dashboard: React.FC = observer(() => {
  const navigate = useNavigate();

  const getIcon = (iconName: string) => {
    const IconComponent = Icons[iconName as keyof typeof Icons];
    return IconComponent ? <IconComponent /> : null;
  };

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.h1}>What do you want to work on today?</h1>
      <div className={styles.cards}>
        {navigationStore.cards.map((card, index) => (
          <Card
            key={index}
            icon={getIcon(card.iconName)}
            name={card.name}
            onClick={() => navigate(card.link)}
          />
        ))}
      </div>
    </div>
  );
});

export default Dashboard;
