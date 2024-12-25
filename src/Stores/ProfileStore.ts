import { makeAutoObservable, runInAction, toJS } from "mobx";
import { LanguageLevel } from "../Enums/LanguageLevel";

class ProfileStore {
  levelOptions = [
    LanguageLevel.A1,
    LanguageLevel.A2,
    LanguageLevel.B1,
    LanguageLevel.B2,
    LanguageLevel.C1,
    LanguageLevel.C2,
  ];

  preferredLanguage = "";
  learningLanguage = "";
  languageLevel: LanguageLevel | "" = "";
  password = "";
  confirmPassword = "";

  constructor() {
    makeAutoObservable(this);
  }

  setPreferredLanguage(language: string) {
    this.preferredLanguage = language;
  }

  setLearningLanguage(language: string) {
    this.learningLanguage = language;
  }

  setLanguageLevel(level: LanguageLevel) {
    runInAction(() => {
      this.languageLevel = level;
    });
    console.log(toJS(this.languageLevel));
  }

  setPassword(password: string) {
    this.password = password;
  }

  setConfirmPassword(confirmPassword: string) {
    this.confirmPassword = confirmPassword;
  }

  saveProfile() {
    // Handle save logic here
    console.log({
      preferredLanguage: this.preferredLanguage,
      learningLanguage: this.learningLanguage,
      languageLevel: this.languageLevel,
      password: this.password,
      confirmPassword: this.confirmPassword,
    });
  }
}

const profileStore = new ProfileStore();
export default profileStore;
