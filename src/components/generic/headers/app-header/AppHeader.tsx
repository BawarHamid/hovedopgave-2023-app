import { IonIcon, IonImg, IonText } from "@ionic/react";
import React from "react";
import logoBlack from "../../../../static/assets/img/Foodzilla.svg";
import logoWhite from "../../../../static/assets/img/innrcircleWhite.svg";
import { IonIcon, IonText } from "@ionic/react";
import React from "react";
import style from "./AppHeader.module.css";

type Icon = {
  icon: string;
  onClick?:
    | ((e: { preventDefault: () => void }) => Promise<void>)
    | (() => void);
  onClick?:
    | ((e: { preventDefault: () => void }) => Promise<void>)
    | (() => void);
};

type AppHeaderProps = {
  title?: string;
  titleColor?: "black" | "white";
  backIcon?: Icon;
  skipIcon?: Icon;
  addIcon?: Icon;
  chatIcon?: Icon;
  homeIcon?: Icon;
};

// test on phone if notification bar pushes or goes over contet
const AppHeader: React.FC<AppHeaderProps> = ({
  title = "Foodzilla",
  titleColor = "",
  skipIcon,
  backIcon,
  
}) => {
  const isLogoLeft =
    !backIcon && !skipIcon ? true : false;
  const isLogoLeftAndBackIcon =
    backIcon && !skipIcon ? true : false;

  return (
    <div
      className={`${
        titleColor === "white" && "bg-transparent"
      } flex h-[7.188rem] ${isLogoLeft && "justify-between"}`}
    >
      {backIcon && (
        <div
          className={`flex ${
            isLogoLeftAndBackIcon ? "w-1/8" : "w-1/5"
          } items-end`}
        >
          {" "}
          <IonIcon
            icon={backIcon.icon}
            size="large"
            className={`${
              titleColor === "white" ? style.whiteIcon : style.blackIcon
            }`}
            onClick={backIcon.onClick}
          />
        </div>
      )}
      <div
        className={`flex w-3/5 items-end ${!isLogoLeft && "justify-center"}`}
      >
        <h1
          className={`font-extrabold
            ${titleColor === "white" && "text-white"}
          `}
        >
          {title}
        </h1>
      </div>
      <div
        className={`flex ${
          !isLogoLeftAndBackIcon ? "w-1/5" : "w-full"
        } items-end justify-end`}
      >
      <div
        className={`flex ${
          !isLogoLeftAndBackIcon ? "w-1/5" : "w-full"
        } items-end justify-end`}
      >
        {skipIcon && (
          <IonText className="text-l text-red-600" onClick={skipIcon.onClick}>
            Skip
          </IonText>
        )}
        {homeIcon && (
          <div className="flex mr-[-0.6rem]">
            <IonIcon
              icon={homeIcon.icon}
              size="large"
              onClick={homeIcon.onClick}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default AppHeader;
