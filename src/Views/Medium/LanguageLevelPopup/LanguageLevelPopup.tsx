import { observer } from "mobx-react";
import { useRef, useEffect } from "react";
import profileStore from "../../../Stores/ProfileStore";
import styles from "./LanguageLevelPopup.module.css";
import Button from "../../Small/Button/Button";
import { LanguageLevel } from "../../../Enums/LanguageLevel";
import SelectInput from "../../Small/SelectInput/SelectInput";

const LanguageLevelPopup: React.FC = observer(() => {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    profileStore.setLanguageLevel(e.target.value as LanguageLevel);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      profileStore.setLanguageLevel(LanguageLevel.B1);
    }
  };

  const handleSave = () => {
    //profileStore.setLanguageLevel(selectedLevel);
  };

  const setLanguageOptions = () => {
    return Object.keys(LanguageLevel).map((key) => ({
      value: key,
      label: LanguageLevel[key as keyof typeof LanguageLevel],
    }));
  };

  return (
    <>
      <div className={styles.overlay}></div>
      <div className={styles.popup} ref={popupRef}>
        <div className={styles.popupContent}>
          <h1 className={styles.title}>Select Your Language Level</h1>
          <SelectInput
            id="languageLevel"
            label="Language Level"
            value={profileStore.languageLevel}
            onChange={handleLevelChange}
            options={setLanguageOptions()}
          />
          <div className={styles.buttonContainer}>
            <Button type="button" onClick={handleSave} label="Save" />
          </div>
        </div>
      </div>
    </>
  );
});

export default LanguageLevelPopup;
