import { IonButton, IonIcon } from "@ionic/react";
import React from "react";
import { chevronForward } from "ionicons/icons";
import { chevronBack } from "ionicons/icons";
import styles from "./RegularButton.module.css";

type RegularButtonProps = {
  text?: string;
  disabled?: boolean;
  onClick?:
    | ((e: { preventDefault: () => void }) => Promise<void>)
    | (() => void);
  iconPosition?: "left" | "right";
  rounded?: boolean;
  theme?: "yellow" | "cyan";
};

const RegularButton: React.FC<RegularButtonProps> = ({
  text = "",
  disabled = false,
  onClick,
  iconPosition = undefined,
  rounded = false,
  theme,
}) => (
  <IonButton
    color={theme === "yellow" ? "warning" : "dark"}
    className={`w-full m-0 h-14 ${
      rounded ? styles.rounded : styles.notRounded
    } ${theme === "yellow" ? styles.outline : ""}`}
    onClick={onClick}
    disabled={disabled}
  >
    <h2>{text}</h2>
    {iconPosition === "right" ? (
      <IonIcon className="absolute right-0" icon={chevronForward} />
    ) : null}
    {iconPosition === "left" ? (
      <IonIcon className="absolute left-0" icon={chevronBack} />
    ) : null}
  </IonButton>
);
export default RegularButton;
