import React from "react";
import { observer } from "mobx-react";
import Graph from "../../Medium/Graph/Graph";
import scoreStore from "../../../Stores/ScoreStore";
import styles from "./Progress.module.css";

const Progress: React.FC = observer(() => {
  const data = scoreStore.getScoresForThreeMonths();

  const fromWeek = data.length > 0 ? Math.min(...data.map(d => d.week)) : 0;
  const untilWeek = data.length > 0 ? Math.max(...data.map(d => d.week)) : 0;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Your Score from Week {fromWeek} to Week {untilWeek}
      </h1>
      <Graph data={data} />
    </div>
  );
});

export default Progress;