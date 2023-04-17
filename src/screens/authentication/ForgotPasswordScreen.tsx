import {
  IonContent,
  IonImg,
  IonPage,
  useIonAlert,
  useIonLoading,
  useIonRouter,
} from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router";
import AuthHeader from "../../components/generic/headers/auth-header/AuthHeader";
import { chevronBack } from "ionicons/icons";
import forgotPassImg from "../../static/assets/img/auth/forgotpassword.png";
import AuthInput, {
  AuthInputType,
} from "../../components/authentication/auth-input/AuthInput";
import RegularButton from "../../components/generic/styled-regulars/button/RegularButton";

const ForgotPasswordScreen: React.FC = () => {
  const history = useHistory();
  const router = useIonRouter();
  const [email, setEmail] = useState<string>("");
  const [present, dismiss] = useIonLoading();
  const [presentAlert] = useIonAlert();

  return (
    <IonPage>
      <IonContent
        fullscreen
        color={"white-background"}
        className="h-full w-full flex justify-center items-center"
      >
        <div className="flex flex-col h-full justify-start w-full px-6">
          <AuthHeader
            title="Restore Your Password"
            text="Simply enter your email to start the process!"
            icon={chevronBack}
            onClick={() => history.goBack()}
          />
          <div className="flex justify-center">
            <IonImg src={forgotPassImg} />
          </div>

          <form className="w-full pt-[25px]">
            <AuthInput
              type={AuthInputType.Email}
              placeholder="Email"
              changeCallback={setEmail}
              value={email}
            />
            <RegularButton
              text="Request reset link"
              rounded
              onClick={() => router.push("/check-mail")}
            />
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ForgotPasswordScreen;
