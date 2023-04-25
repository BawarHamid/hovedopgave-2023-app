import { IonContent, IonPage } from "@ionic/react";
import AppHeader from "../../components/generic/headers/app-header/AppHeader";
import { chevronBack, homeOutline } from "ionicons/icons";

const SelectUploadTypeScreen: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <AppHeader
          backIcon={{ icon: `${chevronBack}` }}
          homeIcon={{ icon: `${homeOutline}` }}
        />
      </IonContent>
    </IonPage>
  );
};

export default SelectUploadTypeScreen;
