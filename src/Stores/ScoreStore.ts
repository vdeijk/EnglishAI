import { makeAutoObservable } from "mobx";

class ScoreStore {
  score = 0;
  scores: { week: number; score: number }[] = [
    { week: 27, score: 50 },
    { week: 28, score: 70 },
    { week: 29, score: 30 },
    { week: 30, score: 90 },
    { week: 31, score: 60 },
    { week: 32, score: 80 },
    { week: 33, score: 100 },
    { week: 34, score: 50 },
    { week: 35, score: 70 },
    { week: 36, score: 30 },
    { week: 37, score: 90 },
    { week: 38, score: 60 },
    { week: 39, score: 80 },
    { week: 40, score: 100 },
    { week: 41, score: 55 },
    { week: 42, score: 65 },
    { week: 43, score: 75 },
    { week: 44, score: 85 },
    { week: 45, score: 95 },
    { week: 46, score: 105 },
    { week: 47, score: 115 },
    { week: 48, score: 125 },
    { week: 49, score: 135 },
    { week: 50, score: 145 },
    { week: 51, score: 155 },
    { week: 52, score: 165 },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  private getWeekNumber(date: Date): number {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - startOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
  }

  incrementScore(points: number) {
    this.score += points;
    const today = new Date();
    const currentWeek = this.getWeekNumber(today);
    const existingScore = this.scores.find((s) => s.week === currentWeek);
    if (existingScore) {
      existingScore.score += points;
    } else {
      this.scores.push({ week: currentWeek, score: points });
    }
  }

  resetScore() {
    this.score = 0;
  }

  getScoresForThreeMonths() {
    const today = new Date();
    const threeMonthsAgo = new Date(today);
    threeMonthsAgo.setMonth(today.getMonth() - 3);
    const startWeek = this.getWeekNumber(threeMonthsAgo);
    const endWeek = this.getWeekNumber(today);

    console.log(startWeek, endWeek);

    return this.scores.filter((s) => s.week >= startWeek && s.week <= endWeek);
  }
}

const scoreStore = new ScoreStore();
export default scoreStore;
