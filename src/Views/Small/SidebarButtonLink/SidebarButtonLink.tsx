import styles from "./SidebarButtonLink.module.css";
import React from "react";

interface SidebarButtonLinkProps {
  name: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const SidebarButtonLink: React.FC<SidebarButtonLinkProps> = ({
  name,
  onClick,
  icon,
}) => {
  return (
    <li className={styles.sidebarLink}>
      <a onClick={onClick} className={styles.link}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <span>{name}</span>
      </a>
    </li>
  );
};

export default SidebarButtonLink;
