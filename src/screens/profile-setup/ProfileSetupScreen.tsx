import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router";
import AuthHeader from "../../components/generic/headers/auth-header/AuthHeader";
import { chevronBack } from "ionicons/icons";
import RegularButton from "../../components/generic/styled-regulars/button/RegularButton";
import RegularInput from "../../components/generic/styled-regulars/input/RegularInput";

const ProfileSetupScreen: React.FC = () => {
  const history = useHistory();
  const router = useIonRouter();
  const [firstName, setFirstname] = useState<string>("");
  const [lastName, setLastname] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  return (
    <IonPage>
      <IonContent
        fullscreen
        color={"white-background"}
        className="h-full w-full flex justify-center items-center"
      >
        <div className="flex flex-col h-full justify-start w-full px-6">
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
            <RegularButton text="Continue" />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ProfileSetupScreen;
