import {
  IonPage,
  IonContent,
  useIonAlert,
  useIonLoading,
  useIonRouter,
} from "@ionic/react";
import { supabase } from "../../apis/supabase/supabaseClient";
import { chevronBack } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import AuthInput, {
  AuthInputType,
} from "../../components/authentication/auth-input/AuthInput";
import FlowHeader from "../../components/generic/headers/auth-header/AuthHeader";
import RegularButton from "../../components/generic/styled-regulars/button/RegularButton";
import { emailRegex } from "../../utils/constants";

const RegisterPage: React.FC = () => {
  const router = useIonRouter();
  const history = useHistory();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatedPassword, setRepeatedPassword] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [passwordShown, setPasswordShown] = useState<boolean>(false);
  const [repeatedPasswordShown, setRepeatedPasswordShown] =
    useState<boolean>(false);
  const [present, dismiss] = useIonLoading();
  const [presentAlert] = useIonAlert();
  const [emailValid, setEmailValid] = useState<boolean>(true);
  const [passwordValid, setPasswordValid] = useState<boolean>(true);
  const [repPasswordValid, setRepPasswordValid] = useState<boolean>(true);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  useEffect(() => {
    if (!email || !password || !repeatedPassword) setIsDisabled(true);
    else setIsDisabled(false);
  }, [email, password, repeatedPassword]);

  const validate = () => {
    setValidationErrors([]);
    const emailCheck = emailRegex.test(email) && email !== "";
    const passwordCheck = password.length >= 8 && password !== "";
    const repPasswordCheck =
      password === repeatedPassword && repeatedPassword !== "";
    setEmailValid(emailCheck);
    setPasswordValid(passwordCheck);
    setRepPasswordValid(repPasswordCheck);
    if (emailCheck && passwordCheck && repPasswordCheck) return true;
    else {
      if (!emailCheck)
        setValidationErrors((prev) => [...prev, "Email invalid"]);
      if (!passwordCheck)
        setValidationErrors((prev) => [
          ...prev,
          "Password must be at least 8 characters",
        ]);
      if (!repPasswordCheck)
        setValidationErrors((prev) => [...prev, "Passwords must match"]);
      return false;
    }
  };

  const handleSignUp = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (validate()) {
      await present({ message: "Creating user..." });
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (data.user) {
        await dismiss();
        await presentAlert({
          header: "Sign up successful!",
          message: "Please verify your email.",
          buttons: ["OK"],
        });
        router.push("/welcome");
      } else {
        await dismiss();
        await presentAlert({
          header: "Sign up failed",
          message: error?.message,
          buttons: ["OK"],
        });
      }
    }
  };

  const renderValidation = () => {
    return (
      <ul className="pt-[0.75rem]">
        {validationErrors.map((error) => (
          <li key={error}>
            <h6>{error}</h6>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <IonPage>
      <IonContent>
        <div className="flex flex-col h-full justify-start w-full px-6">
          <FlowHeader
            title="Welcome!"
            text="Before you can enter Foodzilla, simply register with email and password"
            icon={chevronBack}
            onClick={() => history.goBack()}
          ></FlowHeader>
          <form className="w-full" onSubmit={handleSignUp}>
            <AuthInput
              type={AuthInputType.Email}
              validState={emailValid}
              value={email}
              placeholder="Email"
              changeCallback={setEmail}
            />
            <AuthInput
              type={AuthInputType.Password}
              validState={passwordValid}
              value={password}
              placeholder="Password"
              changeCallback={setPassword}
              shownState={passwordShown}
              togglePasswordButtonType="icon"
              setShown={setPasswordShown}
            />
            <AuthInput
              type={AuthInputType.Repeat}
              validState={repPasswordValid}
              value={repeatedPassword}
              placeholder="Repeat password"
              changeCallback={setRepeatedPassword}
              shownState={repeatedPasswordShown}
              togglePasswordButtonType="icon"
              setShown={setRepeatedPasswordShown}
            />
            <RegularButton
              text="Sign up"
              onClick={handleSignUp}
              disabled={isDisabled}
              theme="yellow"
              rounded
            />
          </form>
          {renderValidation()}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;
