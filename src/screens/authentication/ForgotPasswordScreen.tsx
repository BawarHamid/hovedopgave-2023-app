import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import {
  useIonLoading,
  useIonAlert,
  IonImg,
  useIonRouter,
  IonPage,
  IonContent,
} from "@ionic/react";
import forgotPassImg from "../../static/assets/img/auth/forgotpassword.png";
import { chevronBack } from "ionicons/icons";
import { supabase } from "../../apis/supabase/supabaseClient";
import AuthInput, {
  AuthInputType,
} from "../../components/authentication/auth-input/AuthInput";
import AuthHeader from "../../components/generic/headers/auth-header/AuthHeader";
import RegularButton from "../../components/generic/styled-regulars/button/RegularButton";

const ForgotPasswordScreen: React.FC = () => {
  const history = useHistory();
  const router = useIonRouter();
  const [email, setEmail] = useState<string>("");
  const [present, dismiss] = useIonLoading();
  const [presentAlert] = useIonAlert();

  //TODO: change this with .env
  //Send correct e-mail to next page to show in bold text
  const [IONIC_SERVER_HOST_URL, setIONIC_SERVER_HOST_URL] =
    useState<string>("");
  useEffect(() => {
    const ionicServerHostUrl = window.location.origin;
    setIONIC_SERVER_HOST_URL(ionicServerHostUrl);
  }, []);

  const handleSendPasswordReset = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    await present({ message: "Sending email" });
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${IONIC_SERVER_HOST_URL}/reset-password`,
    });
    if (data) {
      await dismiss();
      await presentAlert({
        header: "Reset email sent",
        message: "If an account exists, a password reset link has been sent.",
        buttons: ["OK"],
      });
      router.push("/check-mail");
    } else {
      await dismiss();
      await presentAlert({
        header: "An error occured",
        message: error?.message,
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

          <form className="w-full pt-[25px]" onSubmit={handleSendPasswordReset}>
            <AuthInput
              type={AuthInputType.Email}
              placeholder="Email"
              changeCallback={setEmail}
              value={email}
            />
            <RegularButton
              text="Request reset link"
              rounded
              onClick={handleSendPasswordReset}
              disabled={!email}
              theme="yellow"
            />
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ForgotPasswordScreen;
