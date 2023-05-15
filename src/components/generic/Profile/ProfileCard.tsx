import {
  IonCard,
  IonCardTitle,
  IonCardContent,
  IonImg,
  IonIcon,
} from "@ionic/react";
import { ellipsisHorizontal } from "ionicons/icons";
import style from "../Profile/ProfileCard.module.css";

type ProfileCardProps = {
  username: string;
  profileImg: string;
  profileDescription: string;
};

const ProfileCard: React.FC<ProfileCardProps> = ({
  username: creatorName,
  profileImg,
  profileDescription,
}) => {
  return (
    <IonCard className={`${style.card}`}>
      <IonCardTitle className="flex flex-row mx-3 mt-3">
        <IonImg src={profileImg} className="w-9 h-9 m-auto" />
        <h4 className="m-auto ml-3 mt-0">{creatorName}</h4>
        <div className="flex-auto" />
        <IonIcon
          icon={ellipsisHorizontal}
          className="flex-initial mr-1 mt-2"
          color="dark"
        />
      </IonCardTitle>
      <IonCardContent className="p-4 pb-5">
        <div className="text-lg text-neutral-500">{profileDescription}</div>
      </IonCardContent>
    </IonCard>
  );
};

export default ProfileCard;
