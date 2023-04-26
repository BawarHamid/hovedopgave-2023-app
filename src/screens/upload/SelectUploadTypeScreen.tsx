import {
  IonCard,
  IonCardContent,
  IonContent,
  IonIcon,
  IonImg,
  IonPage,
  useIonRouter,
} from "@ionic/react";
import AppHeader from "../../components/generic/headers/app-header/AppHeader";
import {
  chevronBack,
  chevronForward,
  homeOutline,
  restaurant,
} from "ionicons/icons";
import placeholderImg from "../../static/assets/img/foodtableimg.png";
import { useHistory } from "react-router";

const SelectUploadTypeScreen: React.FC = () => {
  const history = useHistory();
  const router = useIonRouter();

  return (
    <IonPage>
      <IonContent className="h-full w-full flex justify-center items-center">
        <AppHeader
          backIcon={{
            icon: chevronBack,
            onClick: () => {
              history.goBack();
            },
          }}
          homeIcon={{
            icon: homeOutline,
            onClick: () => {
              router.push("/test-feed");
            },
          }}
        />

        <div className="flex justify-start text-[1.3rem] ml-5 pt-4 pb-2 text-[rgb(157,159,166)]">
          Select uploadtype
        </div>

        <IonCard className="rounded-[1.25rem] pb-1 mx-5">
          <IonImg
            src={placeholderImg}
            className="object-cover overflow-hidden h-24"
            onClick={() => router.push("/set-title")}
          />
          <div className="text-white font-bold text-[1.3rem] mt-[-40px] flex justify-start ml-3">
            Create Recpie
          </div>

          <IonCardContent className="mt-4">
            <div className="flex flex-row justify-between mx-1">
              <IonIcon
                icon={restaurant}
                color="medium"
                onClick={() => router.push("/set-title")}
              />
              <h4 className=" text-[rgb(157,159,166)]">Please select</h4>
              <IonIcon
                icon={chevronForward}
                color="medium"
                onClick={() => router.push("/set-title")}
              />
            </div>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default SelectUploadTypeScreen;
