import { makeAutoObservable, runInAction } from "mobx";
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
  languageLevel: LanguageLevel = LanguageLevel.B1;
  password = "";
  confirmPassword = "";

  constructor() {
    makeAutoObservable(this);
  }

  public setPreferredLanguage(language: string) {
    this.preferredLanguage = language;
  }

  public setLearningLanguage(language: string) {
    this.learningLanguage = language;
  }

  public setLanguageLevel(level: LanguageLevel) {
    runInAction(() => {
      this.languageLevel = level;
    });
  }

  public setPassword(password: string) {
    this.password = password;
  }

  public setConfirmPassword(confirmPassword: string) {
    this.confirmPassword = confirmPassword;
  }

  public saveProfile() {
    // Handle save logic here
    console.log({
      preferredLanguage: this.preferredLanguage,
      learningLanguage: this.learningLanguage,
      languageLevel: this.languageLevel,
      password: this.password,
      confirmPassword: this.confirmPassword,
    });
  }

  public getLanguageLevel() {
    return this.languageLevel;
  }
}

const profileStore = new ProfileStore();
export default profileStore;
