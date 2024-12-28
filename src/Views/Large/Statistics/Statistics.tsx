import React from "react";
import { observer } from "mobx-react-lite";
import styles from "./Statistics.module.css";
import SelectInput from "../../Small/SelectInput/SelectInput";
import { LanguageLevel } from "../../../Enums/LanguageLevel";
import TextInput from "../../Small/TextInput/TextInput";
import statisticsStore from "../../../Stores/StatisticsStore";
import Table from "../../Medium/Table/Table";
import Word from "../../../Interfaces/Word";

const Statistics: React.FC = observer(() => {
  const {
    languageLevel,
    wordStatus,
    searchQuery,
    filteredWords,
    setLanguageLevel,
    setWordStatus,
    setSearchQuery,
  } = statisticsStore;

  const languageLevelOptions = [
    { value: LanguageLevel.A1, label: "A1" },
    { value: LanguageLevel.A2, label: "A2" },
    { value: LanguageLevel.B1, label: "B1" },
    { value: LanguageLevel.B2, label: "B2" },
    { value: LanguageLevel.C1, label: "C1" },
    { value: LanguageLevel.C2, label: "C2" },
  ];

  const wordStatusOptions = [
    { value: "cleared", label: "Cleared" },
    { value: "in-progress", label: "In Progress" },
    { value: "not-started", label: "Not Started" },
  ];

  const columns = [
    { header: "Name", accessor: "name" as keyof Word },
    { header: "Definition", accessor: "definition" as keyof Word },
    { header: "Status", accessor: "status" as keyof Word },
    { header: "Language Level", accessor: "languageLevel" as keyof Word }, 
    { header: "Correct", accessor: "correct" as keyof Word }, 
  ];
  
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <SelectInput
          id="language-level-select"
          label="Select Language Level"
          value={languageLevel}
          onChange={(e) => setLanguageLevel(e.target.value)}
          options={languageLevelOptions}
        />
        <SelectInput
          id="word-status-select"
          label="Word Status"
          value={wordStatus}
          onChange={(e) => setWordStatus(e.target.value)}
          options={wordStatusOptions}
        />
        <TextInput
          id="search-input"
          label="Search"
          placeholder="Search words..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Table columns={columns} data={filteredWords} />
    </div>
  );
});

export default Statistics;
