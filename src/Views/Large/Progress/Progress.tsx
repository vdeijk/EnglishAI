import React from "react";
import { observer } from "mobx-react";
import Graph from "../../Medium/Graph/Graph";
import scoreStore from "../../../Stores/ScoreStore";
import styles from "./Progress.module.css";

const Progress: React.FC = observer(() => {
  const data = scoreStore.getScoresForThreeMonths();

  const fromWeek = data.length > 0 ? Math.min(...data.map((d) => d.week)) : 0;
  const untilWeek = data.length > 0 ? Math.max(...data.map((d) => d.week)) : 0;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Your Progress</h1>
      <p className={styles.text}>
        Here is how well you have been doing from week{" "}
        <span className={styles.bold}>{fromWeek}</span> to week{" "}
        <span className={styles.bold}>{untilWeek}</span>.
      </p>
      <Graph data={data} />
    </div>
  );
});

export default Progress;
