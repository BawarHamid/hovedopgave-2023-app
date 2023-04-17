import { IonItem, IonInput, IonIcon, IonText } from "@ionic/react";
import {
  at,
  eyeOffOutline,
  eyeOutline,
  lockClosedOutline,
} from "ionicons/icons";
import React from "react";
import styles from "./AuthInput.module.css";
/* 
  When using component required props are:
  1. type: import AuthInputType
  2. value: value state
  3. placeholder
  4. changeCallback: value state change function

  Optional props are:
  1. validState and invalidText: Goes together and are used for validation. Don't give these when you want no validation
  Next three should also be used together
  2. shownState: for passwords, true/false state for hide/show. Only put if field is a password
  3. togglePasswordButtonType: specifies if clickable hide/show feature should be text or icon
  4. setShown: shown state change function
*/

export enum AuthInputType {
  Email = "email",
  Password = "password",
  Repeat = "repeat",
}

type Props = {
  type: AuthInputType;
  validState?: boolean;
  value: string;
  placeholder: string;
  changeCallback: React.Dispatch<React.SetStateAction<string>>;
  shownState?: boolean;
  togglePasswordButtonType?: "text" | "icon" | "none";
  setShown?: (value: React.SetStateAction<boolean>) => void;
};

const AuthInput: React.FC<Props> = ({
  type,
  validState = true,
  value,
  placeholder,
  changeCallback,
  shownState,
  togglePasswordButtonType,
  setShown,
}) => {
  const icon = type === AuthInputType.Email ? at : lockClosedOutline;
  const inputType =
    type === AuthInputType.Email ? "email" : shownState ? "text" : "password";
  const showRegularIcon = type === AuthInputType.Email ? true : value === "";

  const togglePasswordButton = () => {
    if (!togglePasswordButtonType || togglePasswordButtonType === "none")
      return;
    if (togglePasswordButtonType === "text") {
      return (
        <div
          className="mr-1 text-sm font-bold cursor-pointer text-primary-brand"
          onClick={() => setShown?.(!shownState)}
        >
          {shownState ? (
            <IonText className="text-brand-tint">Hide</IonText>
          ) : (
            <IonText className="text-brand-tint">Show</IonText>
          )}
        </div>
      );
    }
    if (togglePasswordButtonType === "icon") {
      return (
        <IonIcon
          className="text-brand-tint"
          icon={shownState ? eyeOutline : eyeOffOutline}
          size="medium"
          onClick={() => setShown?.(!shownState)}
        />
      );
    }
  };

  return (
    <>
      <IonItem
        lines="none"
        color={"white-background"}
        className={`border mb-2 ${
          validState ? "border-brand-tint" : "border-red-400"
        }`}
      >
        <IonInput
          onIonChange={(e) => changeCallback(e.detail.value?.toString() ?? "")}
          value={value}
          placeholder={placeholder}
          type={inputType}
          required
          className={`h-[3.7rem] items-center text-xs ${styles.placeholderColor}`}
        />
        {!showRegularIcon && togglePasswordButton()}
        {showRegularIcon && (
          <IonIcon icon={icon} size="medium" color="medium" />
        )}
      </IonItem>
    </>
  );
};

export default AuthInput;
