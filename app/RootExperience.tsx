import type { ReactNode } from "react";
import ParticleScroll from "../components/canvasui/ParticleScroll";
import IntroCover from "./intro/IntroCover";
import styles from "./intro/intro.module.css";

type RootExperienceProps = {
  children: ReactNode;
};

export default function RootExperience({ children }: RootExperienceProps) {
  return (
    <ParticleScroll
      className={styles.rootExperience}
      point={0.68}
      band={420}
      density={2}
      size={1.25}
      spread={220}
      gravity={0.35}
      drift={0.7}
      swirl={60}
      stagger={0.7}
      fade={0.85}
      settle={1.2}
      smoothing={0.6}
    >
      <div className={styles.introCover}>
        <IntroCover />
      </div>
      {children}
    </ParticleScroll>
  );
}
