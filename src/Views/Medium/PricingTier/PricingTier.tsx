import React from "react";
import Button from "../../Small/Button/Button";
import styles from "./PricingTier.module.css";
import { FaCheck } from "react-icons/fa";
import pricingPlanStore from "../../../Stores/PricingPLanStore";

interface TierProps {
  title: string;
  price: string;
  features: string[];
  onSelect: () => void;
}

const Tier: React.FC<TierProps> = ({ title, price, features, onSelect }) => {
  const setTierTitle = () => {
    console.log("title ", pricingPlanStore.currentPlan, title);
    if (pricingPlanStore.currentPlan === title) {
      return "Current Plan";
    }
    return "Select";
  };

  const setClassName = () => {
    if (pricingPlanStore.currentPlan === title) {
      return styles.currentPlan;
    }
    return "";
  };

  return (
    <div className={styles.tier}>
      <h2 className={styles.title}>{title}</h2>
      <h6 className={styles.price}>{price}</h6>
      <ul className={styles.features}>
        {features.map((feature, index) => (
          <li key={index} className={styles.feature}>
            <FaCheck className={styles.checkIcon} /> {feature}
          </li>
        ))}
      </ul>
      <div className={styles.buttonContainer}>
        <Button
          label={setTierTitle()}
          type="button"
          onClick={onSelect}
          disabled={pricingPlanStore.currentPlan === title}
          className={setClassName()}
        />
      </div>
    </div>
  );
};

export default Tier;
