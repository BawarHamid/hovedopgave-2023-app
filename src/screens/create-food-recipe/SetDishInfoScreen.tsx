import {
  IonItem,
  IonInput,
  useIonRouter,
  IonPage,
  IonContent,
  useIonAlert,
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonLabel,
  IonToolbar,
} from "@ionic/react";
import RegularButton from "../../components/generic/styled-regulars/button/RegularButton";
import { useEffect, useState } from "react";
import styles from "./SetDishInfoScreen.module.css";
import { useDishSetup } from "../../store/setup-upload-dish";
import { useHistory } from "react-router";
import { useAuthUserStore } from "../../store/user";
import { close } from "ionicons/icons";
import RegularTextArea from "../../components/generic/styled-regulars/textarea/RegularTextArea";
import RegularInput from "../../components/generic/styled-regulars/input/RegularInput";

const SetDishTitleScreen: React.FC = () => {
  const history = useHistory();
  const router = useIonRouter();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
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
      store.setDishInfo(title.trim(), description.trim(), userId);
      router.push("/set-recipe");

      await presentAlert({
        header: "Info added!",
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
        <IonHeader>
          <IonToolbar>
            <div>
              <h2 className="text-center ml-5">Your own food recipe!</h2>
            </div>

            <IonButtons slot="end">
              <IonButton onClick={() => handleContinue()}>
                <IonLabel className="font-bold">Save!</IonLabel>
              </IonButton>
            </IonButtons>

            <IonButtons slot="start">
              <IonButton onClick={() => history.goBack()}>
                <IonIcon icon={close} size="large" />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <div>
          <h2 className="text-center text-[rgb(174,176,184)] mt-5">
            Hello there! <br />
            It's wonderful to have you here. <br />
            You are now starting the process of uploading <br />
            your very own favorite food recipe, <br />
            good luck!
          </h2>
        </div>
        {/* <div className="flex flex-col items-center h-[12rem] mt-10">
          <h3 className="mb-3"> Please enter the desired name or title </h3>
          <IonItem className={`${styles.noPadding} w-80`}>
            <IonInput
              className={"text-center text-[1.28rem] font-bold leading-10"}
              value={title}
              onIonChange={(e) => setTitle(e.detail.value?.toString() ?? "")}
              placeholder="Recipe Title"
            />
          </IonItem>
        </div>

        <div className="flex flex-col h-full justify-start w-full px-6 mt-[-10px]">
          <h3 className="text-brand-black mb-2">
            Please enter the description of the dish!
          </h3>
          <RegularTextArea
            changeCallback={setDescription}
            placeholder="Add a description to your dish...."
            value={description}
          />

          <div className="pt-2 w-full">
            <RegularButton
              text="Next"
              disabled={!title || !description}
              onClick={() => handleContinue()}
              rounded
              theme="yellow"
            />
          </div>
        </div> */}

        <div className="flex flex-col h-full w-full px-6 mt-10">
          <div className="">
            <h3> Please enter the desired name or title </h3>
            <RegularInput
              value={title}
              changeCallback={setTitle}
              placeholder="Recipe title..."
            />
          </div>

          <div className="mt-5">
            <h3>Please enter the description of the dish</h3>
            <RegularTextArea
              value={description}
              changeCallback={setDescription}
              placeholder="Add a description to your dish..."
            />
          </div>
          <div className="mt-2">
            <RegularButton
              text="Next"
              onClick={handleContinue}
              disabled={!title || !description}
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
