import { makeAutoObservable } from "mobx";

class NavigationStore {
  sidebarLinks: { name: string; link: string; iconName: string }[] = [
    { name: "Dashboard", link: "/", iconName: "FaTachometerAlt" },
    { name: "Conversations", link: "/conversations", iconName: "FaComments" },
    { name: "Vocabulary", link: "/vocabulary", iconName: "FaBook" },
    { name: "Progress", link: "/progress", iconName: "FaChartLine" },
    { name: "Pricing", link: "/upgrade", iconName: "FaStar" },
    { name: "Profile", link: "/profile", iconName: "FaUser" },
    { name: "Statistics", link: "/statistics", iconName: "FaUser" },
    { name: "Logout", link: "/", iconName: "FaSignOutAlt" },
  ];

  cards: { name: string; iconName: string; link: string }[] = [
    { name: "Conversations", iconName: "FaComments", link: "/conversations" },
    { name: "Vocabulary", iconName: "FaBook", link: "/vocabulary" },
  ];

  constructor() {
    makeAutoObservable(this);
  }
}

const navigationStore = new NavigationStore();
export default navigationStore;