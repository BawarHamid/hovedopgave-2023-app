import {
  IonContent,
  IonPage,
  IonToast,
  useIonAlert,
  useIonLoading,
  useIonRouter,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import AuthHeader from "../../components/generic/headers/auth-header/AuthHeader";
import { chevronBack } from "ionicons/icons";
import RegularButton from "../../components/generic/styled-regulars/button/RegularButton";
import RegularInput from "../../components/generic/styled-regulars/input/RegularInput";
import { useAuthUserStore } from "../../store/user";
import { useProfileSetup } from "../../store/setup-profile";
import { supabase } from "../../apis/supabase/supabaseClient";

const ProfileSetupScreen: React.FC = () => {
  // local state
  const [firstName, setFirstname] = useState<string>("");
  const [lastName, setLastname] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const store = useProfileSetup();

  // ion state and hooks
  const history = useHistory();
  const router = useIonRouter();

  const [dismiss] = useIonLoading();
  const [presentAlert] = useIonAlert();
  const [showToast, setShowToast] = useState(false);

  // global state
  // const userId = useAuthUserStore((state) => state.authUser?.id);
  const authUser = useAuthUserStore((state) => state.authUser);

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
    const doesNotExist = await validateUsernameDoesNotExist();
    if (doesNotExist) {
      store.setProfileInformation(
        firstName.trim(),
        lastName.trim(),
        username.trim()
      );
      await presentAlert({
        header: "Information is successfully saved!",
        buttons: ["OK"],
      });
      router.push("/profile-picture");
    } else {
      await dismiss();
      setShowToast(true);
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
            text="Write your information down below to setup your profile!"
            icon={chevronBack}
            onClick={() => history.goBack()}
          />
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
        <IonToast
          isOpen={showToast}
          color="danger"
          position="top"
          onDidDismiss={() => setShowToast(false)}
          message="Username was already taken."
          duration={1500}
        />
      </IonContent>
    </IonPage>
  );
};

export default ProfileSetupScreen;
