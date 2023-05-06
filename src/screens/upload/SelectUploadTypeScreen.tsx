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
  personCircleOutline,
  restaurant,
} from "ionicons/icons";
import placeholderImg from "../../static/assets/img/foodtableimg.png";
import { useHistory } from "react-router";
import { useEffect } from "react";
import { useAuthUserStore } from "../../store/user";

const SelectUploadTypeScreen: React.FC = () => {
  const history = useHistory();
  const router = useIonRouter();

  const authUser = useAuthUserStore((state) => state.authUser);

  useEffect(() => {
    if (!authUser) router.push("/login");
  }, [router, authUser]);

  console.log(authUser?.id);

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
          profileIcon={{
            icon: personCircleOutline,
            onClick: () => {
              router.push("/home");
            },
          }}
        />

        <div className="flex justify-start text-[1.3rem] ml-5 pt-4 text-[rgb(157,159,166)]">
          Select uploadtype
        </div>

        <IonCard className="rounded-[1.25rem] pb-1 mx-5">
          <IonImg
            src={placeholderImg}
            className="object-cover overflow-hidden h-24"
            onClick={() => router.push("/set-info")}
          />
          <div className="text-white font-bold text-[1.3rem] mt-[-40px] flex justify-start ml-3">
            Create Recpie
          </div>

          <IonCardContent className="mt-4">
            <div className="flex flex-row justify-between mx-1">
              <IonIcon
                icon={restaurant}
                color="medium"
                onClick={() => router.push("/set-info")}
              />
              <h4 className=" text-[rgb(157,159,166)]">Please select</h4>
              <IonIcon
                icon={chevronForward}
                color="medium"
                onClick={() => router.push("/set-info")}
              />
            </div>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default SelectUploadTypeScreen;
