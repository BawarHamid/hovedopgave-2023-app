import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonPage,
  useIonRouter,
} from "@ionic/react";
import { chevronBack, chevronForward } from "ionicons/icons";
import { useHistory } from "react-router";
import FlowHeader from "../../components/generic/headers/flow-header/FlowHeader";

const TestFeedScreen: React.FC = () => {
  const history = useHistory();
  const router = useIonRouter();

  return (
    <IonPage>
      <IonContent>
        <div className="flex flex-col h-full justify-start w-full">
          <FlowHeader
            flowTitle="testfeed!"
            rightButtonIcon={{
              icon: chevronForward,
              onClick: () => {
                router.push("/set-title");
              },
            }}
            leftButton={{
              icon: chevronBack,
              onClick: () => {
                history.goBack();
              },
            }}
          />

          <IonCard className="rounded-lg">
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
                  src="https://i.pinimg.com/originals/00/41/88/004188a71ac1fda13f3d5f8472dfcc33.jpg"
                  alt="img1"
                  className="rounded-full h-[400px] w-[250px]"
                />
              </div>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TestFeedScreen;
