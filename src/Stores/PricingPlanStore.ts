import { makeAutoObservable } from "mobx";
import { PricingPlan } from "../Enums/PricingPlan";

class PricingPlanStore {
  currentPlan: string = "Free"; // Default plan

  tiers = [
    {
      title: PricingPlan.Free,
      price: "$0/month",
      features: ["Feature 1", "Feature 2", "Feature 3"],
      onSelect: () => {
        this.setCurrentPlan(PricingPlan.Basic);
      },
    },
    {
      title: PricingPlan.Standard,
      price: "$20/month",
      features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
      onSelect: () => {
        this.setCurrentPlan(PricingPlan.Standard);
      },
    },
    {
      title: PricingPlan.Premium,
      price: "$30/month",
      features: [
        "Feature 1",
        "Feature 2",
        "Feature 3",
        "Feature 4",
        "Feature 5",
      ],
      onSelect: () => {
        this.setCurrentPlan(PricingPlan.Premium);
      },
    },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  setCurrentPlan(plan: string) {
    this.currentPlan = plan;
  }
}

const pricingPlanStore = new PricingPlanStore();
export default pricingPlanStore;
