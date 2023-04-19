import { IonContent, IonImg, IonPage, useIonRouter } from "@ionic/react";
import { useHistory } from "react-router";
import AuthHeader from "../../components/generic/headers/auth-header/AuthHeader";
import { chevronBack } from "ionicons/icons";
import mailImg from "../../static/assets/img/auth/checkmail.png";
import RegularButton from "../../components/generic/styled-regulars/button/RegularButton";

const CheckMailScreen: React.FC = () => {
  const history = useHistory();
  const router = useIonRouter();

  return (
    <IonPage>
      <IonContent
        fullscreen
        color={"white-background"}
        className="h-full w-full flex justify-center items-center"
      >
        <div className="flex flex-col h-full justify-start w-full px-6">
          <AuthHeader
            title="Email Confirmation"
            icon={chevronBack}
            customText={
              <h6 className="text-center">
                We have sent an email to{" "}
                <span className="font-bold">mail@foodzilla.dk</span>
                <br />
                If you can&apos;t find the email, we recommend checking your
                spam filter.
              </h6>
            }
            onClick={() => history.goBack()}
          />

          <div className="flex justify-center">
            <IonImg src={mailImg} />
          </div>

          <form className="w-full pt-4">
            <RegularButton
              text="Back to login"
              rounded
              theme="yellow"
              onClick={() => router.push("/login")}
            />
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CheckMailScreen;
