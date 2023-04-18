import {
  IonButton,
  IonContent,
  IonIcon,
  IonImg,
  IonPage,
  IonToast,
  useIonAlert,
  useIonLoading,
  useIonRouter,
} from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import AuthHeader from "../../components/generic/headers/auth-header/AuthHeader";
import { camera, chevronBack } from "ionicons/icons";
import RegularButton from "../../components/generic/styled-regulars/button/RegularButton";
import RegularInput from "../../components/generic/styled-regulars/input/RegularInput";
import { useAuthUserStore } from "../../store/user";
import { ProfileInsert } from "../../types/types";
import { useProfileSetup } from "../../store/setup-profile";
import styles from "../profile-setup/ProfileSetupScreen.module.css";
import { supabase } from "../../apis/supabase/supabaseClient";
import { uploadProfilePicture } from "../../apis/services/uploadFile.service";
import { insertNewProfile, insertProfile } from "../../apis/supabase/profile";

const ProfileSetupScreen: React.FC = () => {
  // local state
  const [firstName, setFirstname] = useState<string>("");
  const [lastName, setLastname] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [file, setFile] = useState<File | undefined>();
  const profile = useProfileSetup();

  // ion state and hooks
  const history = useHistory();
  const router = useIonRouter();
  // const [showToast, setShowToast] = useState(false);
  const [present, dismiss] = useIonLoading();
  const [presentAlert] = useIonAlert();

  // refs
  const inputRef = useRef<HTMLInputElement>(null);

  // global state
  const userId = useAuthUserStore((state) => state.authUser?.id);
  const authUser = useAuthUserStore((state) => state.authUser);

  // image upload
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

  // route protection and fetch profile
  useEffect(() => {
    if (!authUser) router.push("/login");
  }, [router, authUser]);

  //validation of username
  const validateUsernameDoesNotExist = async () => {
    const { data } = await supabase
      .from("profile")
      .select("username")
      .eq("username", username.trim());
    return data?.length === 0 ? true : false;
  };

  const handleContinue = async () => {
    await present({ message: "Creating profile..." });

    const doesNotExist = await validateUsernameDoesNotExist();
    if (doesNotExist && file && userId) {
      // const uploadData = await uploadProfilePicture(file);

      // const profileToInsert: ProfileInsert = {
      //   id: userId,
      //   first_name: profile.first_name,
      //   last_name: profile.last_name,
      //   username: profile.username,
      //   profile_picture: uploadData ? uploadData.data.url : "",
      // };
      // profile.setProfileFull(
      //   firstName,
      //   lastName,
      //   username,
      //   uploadData?.data.url || ""
      // );
      // await insertNewProfile(profileToInsert);

      insertProfile(userId, firstName, lastName, username, file);

      await dismiss();
      await presentAlert({
        header: "Profile successfully created!",
        buttons: ["OK"],
      });
      router.push("/test-feed");
    } else {
      await dismiss();
      await presentAlert({
        header: "An error occured",
        message: "Login is needed",
        buttons: ["OK"],
      });
      // setShowToast(true);
    }
  };

  return (
    <IonPage>
      <IonContent
        fullscreen
        color={"white-background"}
        className="h-full w-full flex justify-center items-center"
      >
        <div className="flex flex-col px-6">
          <AuthHeader
            title="About you"
            text="Write your information down below and upload a profile picture to setup your profile!"
            icon={chevronBack}
            onClick={() => history.goBack()}
          />
          <div className="flex flex-col justify-center items-center w-full h-full">
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
          </div>
          <div className="my-8" />
          <div className="flex flex-col gap-2">
            <RegularInput
              value={firstName}
              changeCallback={setFirstname}
              placeholder="First name"
            />
            <RegularInput
              value={lastName}
              changeCallback={setLastname}
              placeholder="Last name"
            />
            <RegularInput
              value={username}
              changeCallback={setUsername}
              placeholder="Username"
            />
            <RegularButton
              text="Continue"
              onClick={handleContinue}
              disabled={!firstName || !lastName || !username}
            />
          </div>
        </div>
        {/* <IonToast
          isOpen={showToast}
          color="danger"
          position="top"
          onDidDismiss={() => setShowToast(false)}
          message="Username was already taken."
          duration={1500}
        /> */}
      </IonContent>
    </IonPage>
  );
};

export default ProfileSetupScreen;
