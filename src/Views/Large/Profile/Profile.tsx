import React from "react";
import { observer } from "mobx-react";
import SelectInput from "../../Small/SelectInput/SelectInput";
import profileStore from "../../../Stores/ProfileStore";
import styles from "./Profile.module.css";
import Button from "../../Small/Button/Button";
import { LanguageLevel } from "../../../Enums/LanguageLevel";

const Profile: React.FC = observer(() => {
  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    profileStore.setLanguageLevel(e.target.value as LanguageLevel);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Profile Settings</h1>
      <form className={styles.form}>
        <SelectInput
          id="level"
          label="Level"
          value={profileStore.languageLevel}
          onChange={handleLevelChange}
          options={Object.keys(LanguageLevel).map((key) => ({
            value: key,
            label: LanguageLevel[key as keyof typeof LanguageLevel],
          }))}
        />
        <div className={styles.buttonContainer}>
          <Button
            label="Save"
            onClick={() => profileStore.saveProfile()}
            type="button"
            className={styles.saveButton}
          />
        </div>
      </form>
    </div>
  );
});

export default Profile;
