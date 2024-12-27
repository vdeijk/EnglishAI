import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./Views/Large/Dashboard/Dashboard";
import Vocabulary from "./Views/Large/Vocabulary/Vocabulary";
import Sidebar from "./Views/Medium/Sidebar/Sidebar";
import Navbar from "./Views/Medium/Navbar/Navbar";
import navigationStore from "./Stores/NavigationStore";
import VocabularyAnswer from "./Views/Large/VocabularyAnswer/VocabularyAnswer";
import Progress from "./Views/Large/Progress/Progress";
import Profile from "./Views/Large/Profile/Profile";
import Upgrade from "./Views/Large/Upgrade/Upgrade";
import Conversations from "./Views/Large/Conversations/Conversations";
import Login from "./Views/Large/Login/Login";
import {
  FaTachometerAlt,
  FaComments,
  FaBook,
  FaStar,
  FaUser,
  FaSignOutAlt,
  FaChartLine,
} from "react-icons/fa";
import Error from "./Views/Large/ErrorPage/ErrorPage";
import LanguageLevelPopup from "./Views/Medium/LanguageLevelPopup/LanguageLevelPopup";
import profileStore from "./Stores/ProfileStore";
import { observer } from "mobx-react";
import { ToastContainer } from "react-toastify";
import "./toastify.css";
import { useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import firebaseAuth from "./Configs/FirebaseConfig";

const App = observer(() => {
  const { languageLevel } = profileStore;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("app");

    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const iconMapper: { [key: string]: JSX.Element } = {
    FaTachometerAlt: <FaTachometerAlt />,
    FaComments: <FaComments />,
    FaBook: <FaBook />,
    FaStar: <FaStar />,
    FaUser: <FaUser />,
    FaSignOutAlt: <FaSignOutAlt />,
    FaChartLine: <FaChartLine />,
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const displayCorrectRoute = () => {
    console.log(user);
    if (user) {
      return (
        <div className="dashboard">
          <ToastContainer />
          {!languageLevel && <LanguageLevelPopup />}
          <Sidebar
            links={navigationStore.sidebarLinks.map((link) => ({
              ...link,
              icon: iconMapper[link.iconName],
            }))}
          />
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/vocabulary" element={<Vocabulary />} />
            <Route path="/vocabulary-answer" element={<VocabularyAnswer />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/upgrade" element={<Upgrade />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/conversations" element={<Conversations />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
      );
    }
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  };

  return <>{displayCorrectRoute()}</>;
});

export default App;

/*
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }*/
