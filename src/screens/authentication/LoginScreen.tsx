import {
  IonContent,
  IonPage,
  useIonAlert,
  useIonLoading,
  useIonRouter,
} from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router";
import AuthHeader from "../../components/generic/headers/auth-header/AuthHeader";
import { chevronBack } from "ionicons/icons";
import AuthInput, {
  AuthInputType,
} from "../../components/authentication/auth-input/AuthInput";
import RegularButton from "../../components/generic/styled-regulars/button/RegularButton";

const LoginScreen: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isPasswordRevealed, setIsPasswordRevealed] = useState<boolean>(false);
  const router = useIonRouter();

  return (
    <IonPage>
      <IonContent>
        <div className="flex flex-col h-full justify-start w-full px-6">
          <AuthHeader
            title="Login to Foodzilla"
            text="Login below with email and password"
            icon={chevronBack}
            onClick={() => history.goBack()}
          />

          <form className="w-full pt-10">
            <AuthInput
              type={AuthInputType.Email}
              value={email}
              placeholder="Email"
              changeCallback={setEmail}
            />

            <AuthInput
              type={AuthInputType.Password}
              value={password}
              placeholder="Password"
              changeCallback={setPassword}
              shownState={isPasswordRevealed}
              togglePasswordButtonType="icon"
              setShown={setIsPasswordRevealed}
            />

            <RegularButton text="Login" rounded />

            <div className="w-full flex justify-end mt-2">
              <h5
                onClick={() => router.push("/forgot-password")}
                className="text-help"
              >
                Forgot password?
              </h5>
            </div>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginScreen;
