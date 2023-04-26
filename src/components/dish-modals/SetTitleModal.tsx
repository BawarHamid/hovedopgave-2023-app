import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonToolbar,
  useIonActionSheet,
  useIonAlert,
  useIonRouter,
} from "@ionic/react";
import { close } from "ionicons/icons";
import RegularButton from "../generic/styled-regulars/button/RegularButton";
import { useState, useEffect, useRef } from "react";
import { useDishSetup } from "../../store/setup-upload-dish";
import { useAuthUserStore } from "../../store/user";
import styles from "./SetTitleModal.module.css";
import SetDescriptionModal from "./SetDescriptionModal";

type ModalProps = {
  modalRefTitle: React.RefObject<HTMLIonModalElement>;
};

const SetTitleModal: React.FC<ModalProps> = ({ modalRefTitle }) => {
  const modalRef = useRef<HTMLIonModalElement>(null);
  const openSetDescriptionModal = () => modalRef.current?.present();

  const router = useIonRouter();
  const [title, setTitle] = useState<string>("");
  const store = useDishSetup();
  const [presentAlert] = useIonAlert();
  const [presentingElement, setPresentingElement] =
    useState<HTMLElement | null>(null);
  const [present] = useIonActionSheet();
  const page = useRef(null);

  // global statet
  const authUser = useAuthUserStore((state) => state.authUser);
  const userId = useAuthUserStore((state) => state.authUser?.id);

  useEffect(() => {
    if (!authUser) router.push("/login");
    else {
      setPresentingElement(page.current);
    }
  }, [router, authUser]);

  const handleDismiss = () => {
    modalRefTitle.current?.dismiss();
  };

  const handleContinue = async () => {
    if (userId) {
      store.setDishInfo(title.trim(), userId);
      openSetDescriptionModal();

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

  const canDismiss = async () => {
    return new Promise<boolean>(async (resolve, reject) => {
      await present({
        header: "Are you sure you wanna cancel?",
        buttons: [
          {
            text: "Yes",
            role: "confirm",
          },
          {
            text: "No",
            role: "cancel",
          },
        ],
        onWillDismiss: (ev) => {
          if (ev.detail.role === "confirm") {
            resolve(true);
          } else {
            reject();
          }
        },
      });
    });
  };

  return (
    <IonModal
      ref={modalRefTitle}
      trigger="open-modal"
      canDismiss={canDismiss}
      presentingElement={presentingElement!}
    >
      <IonContent className="h-full w-full flex justify-center items-center">
        <SetDescriptionModal modalRefDescription={modalRef} />
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
          <h3> Please enter the desired name or title </h3>
          <IonItem className={`${styles.noPadding} w-72`}>
            <IonInput
              className={"text-center text-[1.28rem] font-bold leading-10"}
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
    </IonModal>
  );
};

export default SetTitleModal;
