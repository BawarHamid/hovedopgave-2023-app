import {
  IonButton,
  IonContent,
  IonIcon,
  IonImg,
  IonPage,
  useIonAlert,
  useIonLoading,
  useIonRouter,
} from "@ionic/react";
import { camera, chevronBack } from "ionicons/icons";
import { useState, useRef } from "react";
import { useHistory } from "react-router";
import { uploadProfilePicture } from "../../apis/services/uploadFile.service";
import { insertNewProfile } from "../../apis/supabase/profile";
import RegularButton from "../../components/generic/styled-regulars/button/RegularButton";
import { useProfileSetup } from "../../store/setup-profile";
import { useAuthUserStore } from "../../store/user";
import { ProfileInsert } from "../../types/types";
import styles from "../profile-setup/ProfilePictureSetupScreen.module.css";
import AuthHeader from "../../components/generic/headers/auth-header/AuthHeader";

const SetupProfilePictureScreen: React.FC = () => {
  // local state
  const [file, setFile] = useState<File | undefined>();
  const profile = useProfileSetup();

  // ion state and hooks
  const history = useHistory();
  const router = useIonRouter();
  const [dismiss] = useIonLoading();
  const [presentAlert] = useIonAlert();

  // refs
  const inputRef = useRef<HTMLInputElement>(null);

  // global state
  const userId = useAuthUserStore((state) => state.authUser?.id);

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
      const uploadData = await uploadProfilePicture(file);

      const profileToInsert: ProfileInsert = {
        id: userId,
        first_name: profile.first_name,
        last_name: profile.last_name,
        username: profile.username,
        profile_picture: uploadData ? uploadData.data.url : "",
      };
      profile.setProfilePicture(uploadData?.data.url || "");
      await insertNewProfile(profileToInsert);

      router.push("/test-feed");

      await presentAlert({
        header: "Profile is successfully created!",
        buttons: ["OK"],
      });
    } else {
      await dismiss();
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
        <AuthHeader
          title="Select Profile picture"
          text="You are one step away, please select a profile picture!"
          icon={chevronBack}
          onClick={() => history.goBack()}
        />
        <div className="flex flex-col px-5 items-center">
          <IonButton
            className={`${styles.rounded}`}
            color="light"
            onClick={handleClick}
          >
            {!file ? (
              <IonIcon icon={camera} size="large" color="medium" />
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
          <h4 className="mt-5 text-help">
            Click here to upload a profile picture
          </h4>
          <div className="my-8" />
          <RegularButton text="Continue" onClick={handleContinue} />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SetupProfilePictureScreen;
