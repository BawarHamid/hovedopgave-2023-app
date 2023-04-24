import {
  IonContent,
  IonPage,
  useIonAlert,
  useIonLoading,
  useIonRouter,
} from "@ionic/react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import AuthHeader from "../../components/generic/headers/auth-header/AuthHeader";
import { chevronBack } from "ionicons/icons";
import AuthInput, {
  AuthInputType,
} from "../../components/authentication/auth-input/AuthInput";
import RegularButton from "../../components/generic/styled-regulars/button/RegularButton";
import { checkUserHasProfile } from "../../apis/supabase/profile";
import { supabase } from "../../apis/supabase/supabaseClient";
import { useAuthUserStore } from "../../store/user";

const LoginScreen: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isPasswordRevealed, setIsPasswordRevealed] = useState<boolean>(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);

  const router = useIonRouter();
  const [present, dismiss] = useIonLoading();
  const [presentAlert] = useIonAlert();

  const setAuthUser = useAuthUserStore((state) => state.setAuthUser);

  useEffect(() => {
    setIsSubmitDisabled(!(email.includes("@") && password !== ""));
  }, [email, password]);

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await present({ message: "Signing in..." });
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (data.user && data.user.aud === "authenticated") {
      const hasProfile = await checkUserHasProfile(data.user.id);
      setAuthUser(data.user);
      await dismiss();
      hasProfile ? router.push("/home") : router.push("/onboarding");
    } else {
      await dismiss();
      await presentAlert({
        header: "Login failed",
        message: error?.message,
        buttons: ["OK"],
      });
    }
  };

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

            <RegularButton
              text="Login"
              rounded
              onClick={handleLogin}
              disabled={isSubmitDisabled}
            />

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
