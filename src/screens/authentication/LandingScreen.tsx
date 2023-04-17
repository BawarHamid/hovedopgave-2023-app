import { IonContent, IonImg, IonPage, useIonRouter } from "@ionic/react";
import Hero from "../../static/assets/img/auth/foodzillaHero.png";
import React from "react";
import RegularButton from "../../components/generic/styled-regulars/button/RegularButton";

const LandingScreen: React.FC = () => {
  const router = useIonRouter();

  return (
    <IonPage>
      <IonContent fullscreen color={"white-background"}>
        <div className="w-full h-full flex-row items-center justify-center">
          <div className="w-full h-1/2 short:h-2/5">
            <IonImg className="h-full object-cover" src={Hero}></IonImg>
          </div>
          <div className="w-full px-5">
            <div className="w-full pt-6 pb-5">
              <h1 className="font-semibold text-brand-black pb-2">
                Welcome to Foodzilla!
              </h1>
              <h4 className="text-brand-black">
                With this app you will find lots of lovely recipes for easy and
                tasty food that the whole family will love!
              </h4>
            </div>
            <div className="flex flex-col gap-2 mt-3">
              <RegularButton
                text="Login"
                theme="cyan"
                iconPosition="right"
                rounded
                onClick={() => router.push("/login")}
              ></RegularButton>
              <RegularButton
                text="Register"
                theme="yellow"
                rounded
                iconPosition="right"
                onClick={() => router.push("/register")}
              ></RegularButton>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LandingScreen;
