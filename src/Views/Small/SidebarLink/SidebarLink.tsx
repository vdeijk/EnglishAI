import styles from "./SidebarLink.module.css";
import React from "react";
import { Link } from "react-router";

interface SidebarLinkProps {
  name: string;
  link: string;
  icon: React.ReactNode;
  dynamicCssClass?: string;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
  name,
  link,
  icon,
  dynamicCssClass,
}) => {
  return (
    <li className={`${styles.sidebarLink} ${dynamicCssClass}`}>
      <Link className={styles.link} to={link}>
        {icon && <span className={styles.icon}>{icon}</span>}
        {name}
      </Link>
    </li>
  );
};

export default SidebarLink;
