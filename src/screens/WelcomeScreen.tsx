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
        <IonCard className="mt-10 rounded-lg">
          <IonCardHeader>
            <IonCardTitle className="text-cyan-300 flex justify-center">
              Card Title
            </IonCardTitle>
            <IonCardSubtitle className="font-bold text-red-400 flex justify-center">
              Card Subtitle
            </IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <div className=" text-green-400 flex justify-center font-extrabold">
              Here's a small text in the content section
            </div>
            <div className="mt-5 mb-5 flex justify-center">
              <img
                src="https://play-lh.googleusercontent.com/ShEdBTR84fzjVgBMzEHKDAGcbfEtyFUlO1jv0W2-viKsx2CvphvrfKAeQft1PCu8VUw"
                alt="img1"
                className="h-[12.5rem] w-[12.5rem] rounded-full"
              />
            </div>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default WelcomeScreen;
