import {
  IonItem,
  IonInput,
  useIonRouter,
  IonPage,
  IonContent,
  useIonAlert,
} from "@ionic/react";
import RegularButton from "../../components/generic/styled-regulars/button/RegularButton";
import { useEffect, useState } from "react";
import styles from "./SetDishTitle.module.css";
import { useDishSetup } from "../../store/setup-upload-dish";
import { useHistory } from "react-router";
import { useAuthUserStore } from "../../store/user";
import { chevronForward, chevronBack } from "ionicons/icons";
import FlowHeader from "../../components/generic/headers/flow-header/FlowHeader";

const SetDishTitleScreen: React.FC = () => {
  const history = useHistory();
  const router = useIonRouter();
  const [title, setTitle] = useState<string>("");
  const store = useDishSetup();
  const [presentAlert] = useIonAlert();

  // global statet
  const authUser = useAuthUserStore((state) => state.authUser);
  const userId = useAuthUserStore((state) => state.authUser?.id);

  useEffect(() => {
    if (!authUser) router.push("/login");
  }, [router, authUser]);

  const handleContinue = async () => {
    if (userId) {
      store.setDishInfo(title.trim(), userId);
      router.push("/set-description");

      await presentAlert({
        header: "Title added!",
        buttons: ["OK"],
      });
    } else {
      await presentAlert({
        header: "An error occured",
        message: "Login is needed",
        buttons: ["OK"],
      });
    }
  };

  return (
    <IonPage>
      <IonContent className="h-full w-full flex justify-center items-center">
        <FlowHeader
          flowTitle="Your own food recipe!"
          rightButtonIcon={{
            icon: chevronForward,
            onClick: () => {
              handleContinue();
            },
          }}
          leftButton={{
            icon: chevronBack,
            onClick: () => {
              history.goBack();
            },
          }}
        />
        <div>
          <h2 className="text-center text-[rgb(174,176,184)] mt-10">
            Hello there! <br />
            It's wonderful to have you here. <br />
            You are now starting the process of uploading <br />
            your very own favorite food recipe, <br />
            good luck!
          </h2>
        </div>
        <div className="flex flex-col items-center justify-between h-[12rem] mt-28">
          <h3>Please enter the title of your dish! </h3>
          <IonItem className={`${styles.noPadding} w-72`}>
            <IonInput
              className={"text-center text-[1.3rem] font-bold leading-10"}
              value={title}
              onIonChange={(e) => setTitle(e.detail.value?.toString() ?? "")}
              placeholder="Recipe Title"
            />
          </IonItem>
          <div className="pt-4 w-full px-6">
            <RegularButton
              text="Next"
              disabled={!title}
              onClick={() => handleContinue()}
              rounded
              theme="yellow"
            />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SetDishTitleScreen;
