import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonModal,
  IonToolbar,
  useIonActionSheet,
  useIonAlert,
  useIonRouter,
} from "@ionic/react";
import { close } from "ionicons/icons";
import { useState, useEffect, useRef } from "react";
import { useDishSetup } from "../../../store/setup-upload-dish";
import { useAuthUserStore } from "../../../store/user";
import RegularButton from "../../generic/styled-regulars/button/RegularButton";
import RegularTextArea from "../../generic/styled-regulars/textarea/RegularTextArea";
import SetPictureModal from "./SetPictureModal";

type ModalProps = {
  modalRefRecipe: React.RefObject<HTMLIonModalElement>;
};

const SetRecipeModal: React.FC<ModalProps> = ({ modalRefRecipe }) => {
  // ion state and hooks
  const modalRef = useRef<HTMLIonModalElement>(null);
  const openSetPictureModal = () => modalRef.current?.present();

  const router = useIonRouter();
  const [presentAlert] = useIonAlert();
  const [recipe, setRecipe] = useState<string>("");
  const dish = useDishSetup();
  const [presentingElement, setPresentingElement] =
    useState<HTMLElement | null>(null);
  const [present] = useIonActionSheet();
  const page = useRef(null);

  // global state
  const userId = useAuthUserStore((state) => state.authUser?.id);
  const authUser = useAuthUserStore((state) => state.authUser);

  useEffect(() => {
    if (!authUser) router.push("/login");
    else {
      setPresentingElement(page.current);
    }
  }, [router, authUser]);

  const handleDismiss = () => {
    modalRefRecipe.current?.dismiss();
  };

  const handleContinue = async () => {
    if (userId) {
      dish.setDishRecipe(recipe);
      openSetPictureModal();
      modalRef.current?.dismiss();

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

  // const canDismiss = async () => {
  //   return new Promise<boolean>(async (resolve, reject) => {
  //     await present({
  //       header: "Are you sure you wanna cancel?",
  //       buttons: [
  //         {
  //           text: "Yes",
  //           role: "confirm",
  //         },
  //         {
  //           text: "No",
  //           role: "cancel",
  //         },
  //       ],
  //       onWillDismiss: (ev) => {
  //         if (ev.detail.role === "confirm") {
  //           resolve(true);
  //         } else {
  //           reject();
  //         }
  //       },
  //     });
  //   });
  // };

  return (
    <IonModal
      ref={modalRefRecipe}
      trigger="open-modal"
      // canDismiss={canDismiss}
      presentingElement={presentingElement!}
    >
      <IonContent
        fullscreen
        color={"white-background"}
        className="h-full w-full flex justify-center items-center"
      >
        <SetPictureModal modalRefPicture={modalRef} />
        <IonHeader>
          <IonToolbar>
            <div>
              <h2 className="text-center ml-5">Your own food recipe!</h2>
            </div>

            <IonButtons slot="end">
              <IonButton onClick={() => handleContinue()}>
                <IonLabel className="font-bold" color="medium">
                  Save!
                </IonLabel>
              </IonButton>
            </IonButtons>

            <IonButtons slot="start">
              <IonButton onClick={() => handleDismiss()}>
                <IonIcon icon={close} size="large" color="medium" />
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
          <div className="pt-4">
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
    </IonModal>
  );
};

export default SetRecipeModal;
