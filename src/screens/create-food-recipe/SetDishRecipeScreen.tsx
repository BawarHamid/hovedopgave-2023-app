import {
  IonPage,
  IonContent,
  useIonRouter,
  useIonAlert,
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonLabel,
  IonToolbar,
} from "@ionic/react";
import { close } from "ionicons/icons";
import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import { useDishSetup } from "../../store/setup-upload-dish";
import { useAuthUserStore } from "../../store/user";
import RegularTextArea from "../../components/generic/styled-regulars/textarea/RegularTextArea";
import RegularButton from "../../components/generic/styled-regulars/button/RegularButton";

const SetDishRecipeScreen: React.FC = () => {
  // ion state and hooks
  const history = useHistory();
  const router = useIonRouter();
  const [presentAlert] = useIonAlert();
  const [recipe, setRecipe] = useState<string>("");
  const dish = useDishSetup();

  // global state
  const userId = useAuthUserStore((state) => state.authUser?.id);
  const authUser = useAuthUserStore((state) => state.authUser);

  useEffect(() => {
    if (!authUser) router.push("/login");
  }, [router, authUser]);

  const handleContinue = async () => {
    if (userId) {
      dish.setDishRecipe(recipe);
      router.push("/set-picture");

      await presentAlert({
        header: "Recipe added!",
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
      <IonContent
        fullscreen
        color={"white-background"}
        className="h-full w-full flex justify-center items-center"
      >
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

        <div className="flex flex-col h-full justify-start w-full px-6 mt-10">
          <h3 className="text-brand-black mb-1">
            Please enter the recipe of the dish
          </h3>
          <RegularTextArea
            changeCallback={setRecipe}
            placeholder="Add the recipe for the dish...."
            value={recipe}
          />
          <div className="pt-2">
            <RegularButton
              text="Next"
              disabled={!recipe}
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

export default SetDishRecipeScreen;
