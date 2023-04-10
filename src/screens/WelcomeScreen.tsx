import React, { useState } from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonPage,
} from "@ionic/react";

const WelcomeScreen: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <IonCard className="mt-20">
          <IonCardHeader>
            <IonCardTitle className=" text-cyan-300">Card Title</IonCardTitle>
            <IonCardSubtitle className="font-bold text-red-400">
              Card Subtitle
            </IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent className="font-extrabold text-green-400">
            Here's a small text description for the card content. Nothing more,
            nothing less.
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default WelcomeScreen;
