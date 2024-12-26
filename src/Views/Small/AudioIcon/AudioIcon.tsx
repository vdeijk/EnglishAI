import React from "react";
import { FaVolumeUp } from "react-icons/fa";
import styles from "./AudioIcon.module.css";

interface AudioIconProps {
  audioUrl: string | undefined;
}

const AudioIcon: React.FC<AudioIconProps> = ({ audioUrl }) => {
  const handlePlayAudio = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    }
  };

  return <FaVolumeUp className={styles.audioIcon} onClick={handlePlayAudio} />;
};

export default AudioIcon;
