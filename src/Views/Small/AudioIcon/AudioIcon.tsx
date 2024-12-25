import React from "react";
import { FaVolumeUp } from "react-icons/fa";
import styles from "./AudioIcon.module.css";

interface AudioIconProps {
  audioSrc: string;
}

const AudioIcon: React.FC<AudioIconProps> = ({ audioSrc }) => {
  const handleClick = () => {
    const audio = new Audio(audioSrc);
    audio.play();
  };

  return (
    <FaVolumeUp className={styles.audioIcon} onClick={handleClick} />
  );
};

export default AudioIcon;