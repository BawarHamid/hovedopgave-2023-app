import { IonPage, IonContent, useIonRouter, useIonAlert } from "@ionic/react";
import { chevronBack, chevronForward } from "ionicons/icons";
import FlowHeader from "../../components/generic/headers/flow-header/FlowHeader";
import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import { useDishSetup } from "../../store/setup-upload-dish";
import { useAuthUserStore } from "../../store/user";
import RegularTextArea from "../../components/generic/styled-regulars/textarea/RegularTextArea";
import RegularButton from "../../components/generic/styled-regulars/button/RegularButton";

const SetDishDescriptionScreen: React.FC = () => {
  // ion state and hooks
  const history = useHistory();
  const router = useIonRouter();
  const [presentAlert] = useIonAlert();
  const [description, setDescription] = useState<string>("");
  const dish = useDishSetup();

  // global state
  const userId = useAuthUserStore((state) => state.authUser?.id);
  const authUser = useAuthUserStore((state) => state.authUser);

  useEffect(() => {
    if (!authUser) router.push("/login");
  }, [router, authUser]);

  const handleContinue = async () => {
    if (userId) {
      dish.setDishDescription(description);
      router.push("/set-recipe");

      await presentAlert({
        header: "Description added!",
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

        <div className="flex flex-col h-full justify-start w-full px-6 mt-5">
          <h3 className="text-brand-black mb-1">
            Please enter the description of the dish!
          </h3>
          <RegularTextArea
            changeCallback={setDescription}
            placeholder="Add a description to your dish...."
            value={description}
          />
          <div className="pt-4">
            <RegularButton
              text="Next"
              disabled={!description}
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

export default SetDishDescriptionScreen;