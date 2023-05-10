import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonLabel,
  IonModal,
  IonToolbar,
  useIonActionSheet,
  useIonAlert,
  useIonRouter,
} from "@ionic/react";
import { arrowUpCircleOutline, close } from "ionicons/icons";
import RegularButton from "../generic/styled-regulars/button/RegularButton";
import styles from "./SetPictureModal.module.css";
import { useState, useEffect, useRef } from "react";
import { uploadRecipePicture } from "../../apis/services/uploadFile.service";
import { insertNewDish } from "../../apis/supabase/dish";
import { useDishSetup } from "../../store/setup-upload-dish";
import { useAuthUserStore } from "../../store/user";
import { DishInsert } from "../../types/types";

type ModalProps = {
  modalRefPicture: React.RefObject<HTMLIonModalElement>;
};

const SetPictureModal: React.FC<ModalProps> = ({ modalRefPicture }) => {
  // local state
  const [file, setFile] = useState<File | undefined>();
  const dish = useDishSetup();
  const modalRef = useRef<HTMLIonModalElement>(null);
  const routetofeed = () => router.push("/test-feed");

  // ion state and hooks
  const router = useIonRouter();
  const [presentAlert] = useIonAlert();
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
    modalRefPicture.current?.dismiss();
  };

  // refs
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      setFile(files[0]);

      Array.from(e.target.files).map(
        (file) => URL.revokeObjectURL(String(file)) // avoid memory leak
      );
    }
  };

  const handleContinue = async () => {
    if (file && userId) {
      const uploadData = await uploadRecipePicture(file);
      const dishToInsert: DishInsert = {
        title: dish.title,
        description: dish.description,
        recipe: dish.recipe,
        recipe_picture: uploadData ? uploadData.data.url : "",
        profile_fk: userId,
      };

      dish.setRecipePicture(uploadData?.data.url || "");
      await insertNewDish(dishToInsert);
      routetofeed();
      modalRef.current?.dismiss();
      modalRefPicture.current?.dismiss();

      await presentAlert({
        header: "The dish was successfully created",
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
      ref={modalRefPicture}
      trigger="open-modal"
      // canDismiss={canDismiss}
      presentingElement={presentingElement!}
    >
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

        <h6 className="text-center text-brand-black mt-1">
          As the last step before completing your upload, <br />
          you will need to add a picture of the dish. <br />
          <p className="text-help">
            <br /> Please click below to add a image!
          </p>
        </h6>
        <div className="flex justify-center mt-2">
          <IonButton className={`${styles.rounded}`} onClick={handleClick}>
            {!file ? (
              <div className="flex flex-col gap-2 items-center">
                <IonIcon className={styles.icon} icon={arrowUpCircleOutline} />
                <h3 className="text-yellow-200">Upload Image</h3>
              </div>
            ) : (
              <IonImg
                className="h-full object-cover w-full"
                src={URL.createObjectURL(file)}
              />
            )}
          </IonButton>
          <input
            style={{ display: "none" }}
            ref={inputRef}
            type="file"
            onChange={handleImageChange}
            accept="image/png, image/jpeg"
          />
        </div>

        <div className="pt-6 px-5">
          <RegularButton
            text="Upload dish"
            disabled={!file}
            onClick={() => handleContinue()}
            rounded
            theme="yellow"
          />
        </div>
      </IonContent>
    </IonModal>
  );
};

export default SetPictureModal;
