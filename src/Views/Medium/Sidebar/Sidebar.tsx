import styles from "./Sidebar.module.css";
import React from "react";
import SidebarLink from "../../Small/SidebarLink/SidebarLink";
import { observer } from "mobx-react";
import { useAuth0 } from "@auth0/auth0-react";
import SidebarButtonLink from "../../Small/SidebarButtonLink/SidebarButtonLink";
import { FaStar } from "react-icons/fa";
import Button from "../../Small/Button/Button";
import { useLocation } from "react-router-dom";
import { FaRocket } from "react-icons/fa";

interface SidebarProps {
  links: SidebarLink[];
}

interface SidebarLink {
  name: string;
  link: string;
  icon: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = observer(({ links }) => {
  const location = useLocation();
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  const setDynamicCss = (isActive: boolean) => {
    if (isActive) {
      return `${styles.link} ${styles.active}`;
    }
    return styles.link;
  };

  const setupLink = (link: SidebarLink, index: number) => {
    const isActive = location.pathname === link.link;
    console.log(isActive + " " + link.link);

    if (link.name === "Logout") {
      return (
        <SidebarButtonLink
          key={index}
          name={link.name}
          icon={link.icon}
          onClick={handleLogout}
          dynamicCssClass={setDynamicCss(isActive)}
        />
      );
    }
    return (
      <SidebarLink
        key={index}
        name={link.name}
        link={link.link}
        icon={link.icon}
        dynamicCssClass={setDynamicCss(isActive)}
      />
    );
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <FaRocket className={styles.rocketIcon} />
        <h2 className={styles.logoText}>LangRocket.AI</h2>
      </div>
      <ul className={styles.list}>
        {links.map((link, index) => setupLink(link, index))}
      </ul>
      <Button
        label="Upgrade now"
        onClick={() => {}}
        type="button"
        disabled={false}
        icon={<FaStar />}
      />
    </div>
  );
});

export default Sidebar;
