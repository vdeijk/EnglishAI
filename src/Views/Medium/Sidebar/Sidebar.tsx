import styles from "./Sidebar.module.css";
import React from "react";
import SidebarLink from "../../Small/SidebarLink/SidebarLink";
import SidebarScore from "../../Small/SidebarScore/SidebarScore";
import scoreStore from "../../../Stores/ScoreStore";
import { observer } from "mobx-react";
import { useAuth0 } from "@auth0/auth0-react";
import SidebarButtonLink from "../../Small/SidebarButtonLink/SidebarButtonLink";

interface SidebarProps {
  links: SidebarLink[];
}

interface SidebarLink {
  name: string;
  link: string;
  icon: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = observer(({ links }) => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  const setupLink = (link: SidebarLink, index: number) => {
    if (link.name === "Logout") {
      return (
        <SidebarButtonLink
          key={index}
          name={link.name}
          icon={link.icon}
          onClick={handleLogout}
        />
      );
    }
    return (
      <SidebarLink
        key={index}
        name={link.name}
        link={link.link}
        icon={link.icon}
      />
    );
  };

  return (
    <div className={styles.sidebar}>
      <ul className={styles.list}>
        {links.map((link, index) => setupLink(link, index))}
      </ul>
      <SidebarScore score={scoreStore.score} />
    </div>
  );
});

export default Sidebar;

