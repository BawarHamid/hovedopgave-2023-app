import { IonIcon, IonImg, IonText, useIonRouter } from "@ionic/react";
import React from "react";
import logoBlack from "../../../../static/assets/img/Foodzilla.svg";
import logoWhite from "../../../../static/assets/img/innrcircleWhite.svg";

type Icon = {
  icon: string;
  onClick?:
    | ((e: { preventDefault: () => void }) => Promise<void>)
    | (() => void);
};

type AppHeaderProps = {
  logoColor?: "black" | "white";
  backIcon?: Icon;
  skipIcon?: Icon;
  addIcon?: Icon;
  chatIcon?: Icon;
  homeIcon?: Icon;
  profileIcon?: Icon;
};

// test on phone if notification bar pushes or goes over contet
const AppHeader: React.FC<AppHeaderProps> = ({
  logoColor = "black",
  skipIcon,
  backIcon,
  addIcon,
  chatIcon,
  homeIcon,
  profileIcon,
}) => {
  const isLogoLeft =
    addIcon && chatIcon && !backIcon && !skipIcon && !homeIcon && !profileIcon
      ? true
      : false;
  const isLogoLeftAndBackIcon =
    addIcon && chatIcon && backIcon && !skipIcon && !homeIcon && !profileIcon
      ? true
      : false;

  const router = useIonRouter();

  return (
    <div
      className={`${logoColor === "white" && "bg-transparent"} flex ${
        isLogoLeft && "justify-between"
      } px-5 py-10`}
    >
      {backIcon && (
        <div
          className={`flex ${
            isLogoLeftAndBackIcon ? "w-1/3" : "w-1/5"
          } items-end`}
        >
          <IonIcon
            icon={backIcon.icon}
            size="large"
            className={`ml-[-0.6rem]
              logoColor === "white" ? style.whiteIcon : style.blackIcon
            }`}
            onClick={backIcon.onClick}
          />
        </div>
      )}
      <div className={`flex w-3/5 ${!isLogoLeft && "justify-center"}`}>
        {logoColor === "black" ? (
          <IonImg
            className="w-[7.5rem]"
            src={logoBlack}
            onClick={() => router.push("/your-feed")}
          />
        ) : (
          <IonImg className="w-[7.5rem]" src={logoWhite} />
        )}
      </div>
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
        {addIcon && (
          <div className="flex mr-[-0.5rem] pt-2">
            <IonIcon
              icon={addIcon.icon}
              size="large"
              onClick={addIcon.onClick}
            />
          </div>
        )}
        {profileIcon && (
          <div className="flex mr-[-0.6rem]">
            <IonIcon
              icon={profileIcon.icon}
              size="large"
              onClick={profileIcon.onClick}
            />
          </div>
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
