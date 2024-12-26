import React from "react";
import Tier from "../../Medium/PricingTier/PricingTier";
import styles from "./Upgrade.module.css";
import pricingPlanStore from "../../../Stores/PricingPlanStore";

const Upgrade: React.FC = () => {
  const { tiers } = pricingPlanStore;

  return (
    <div className={styles.plan}>
      <div className={styles.container}>
        <h1 className={styles.title}>Upgrade Your Plan</h1>
        <p className={styles.description}>
          Choose the plan that best suits your needs and take your language
          learning to the next level. Each plan offers unique features designed
          to help you achieve your goals faster and more effectively.
        </p>
        <div className={styles.tiers}>
          {tiers.map((tier, index) => (
            <Tier
              key={index}
              title={tier.title}
              price={tier.price}
              features={tier.features}
              onSelect={tier.onSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Upgrade;
