import {
  IonButton,
  IonContent,
  IonIcon,
  IonImg,
  IonPage,
  useIonAlert,
  useIonRouter,
} from "@ionic/react";
import FlowHeader from "../../components/generic/headers/flow-header/FlowHeader";
import { useHistory } from "react-router";
import {
  arrowUpCircleOutline,
  chevronBack,
  chevronForward,
} from "ionicons/icons";
import { useState, useRef, useEffect } from "react";
import { useDishSetup } from "../../store/setup-upload-dish";
import styles from "./create-dish.module.css";
import { useAuthUserStore } from "../../store/user";
import { uploadRecipePicture } from "../../apis/services/uploadFile.service";
import { DishInsert } from "../../types/types";
import { insertNewDish } from "../../apis/supabase/dish";
import RegularButton from "../../components/generic/styled-regulars/button/RegularButton";

const SetDishPictureScreen: React.FC = () => {
  // local state
  const [file, setFile] = useState<File | undefined>();
  const dish = useDishSetup();

  // ion state and hooks
  const history = useHistory();
  const router = useIonRouter();
  const [presentAlert] = useIonAlert();

  // global state
  const userId = useAuthUserStore((state) => state.authUser?.id);
  const authUser = useAuthUserStore((state) => state.authUser);

  useEffect(() => {
    if (!authUser) router.push("/login");
  }, [router, authUser]);

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
        id: userId,
        title: dish.title,
        description: dish.description,
        recipe: dish.recipe,
        recipe_picture: uploadData ? uploadData.data.url : "",
        profile_fk: userId,
      };

      dish.setRecipePicture(uploadData?.data.url || "");
      await insertNewDish(dishToInsert);
      router.push("/test-feed");

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
    </IonPage>
  );
};

export default SetDishPictureScreen;
