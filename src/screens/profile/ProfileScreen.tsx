import { IonButton, IonContent, IonIcon, IonPage } from "@ionic/react";
import AppHeader from "../../components/generic/headers/app-header/AppHeader";
import { addCircle, chevronBack } from "ionicons/icons";
import { useState, useEffect } from "react";
import { RouteComponentProps, useHistory } from "react-router";
import { useAuthUserStore } from "../../store/user";
import { Dish, ProfileWithDish } from "../../types/types";
import { getProfileWithDish } from "../../apis/supabase/profile";
import style from "antd/es/alert/style";
import DishCard from "../../components/content/cards/DishCard";
import CollapsableText from "../../components/generic/collapsable-text/CollapsableText";
import AuthHeader from "../../components/generic/headers/auth-header/AuthHeader";

type ProfilePageProps = RouteComponentProps<{
  id: string;
}>;

const ProfileScreen: React.FC<ProfilePageProps> = ({ match }) => {
  // profile fetched with interests
  const userId = useAuthUserStore((state) => state.authUser?.id);
  const [profile, setProfile] = useState<ProfileWithDish>();
  const [isYourProfile, setIsYourProfile] = useState<boolean>(false);
  const [dish, setDish] = useState<Dish[] | Dish>();
  const history = useHistory();

  useEffect(() => {
    getProfileWithDish(match.params.id).then((response) => {
      setProfile(response);
      setDish(response.dish);
    });
  }, [match.params.id]);

  useEffect(() => setIsYourProfile(userId === profile?.id), [userId, profile]);

  // console.log(isYourProfile);

  const renderProfileHeader = (p: ProfileWithDish) => (
    <div className="flex flex-col pl-7 pr-3 mb-5">
      <div className="flex justify-between items-center">
        <img
          src={p.profile_picture}
          alt="profile"
          className="rounded-full w-20 h-20"
        />
        <div className="flex w-60 flex-col">
          <IonButton
            disabled
            //className={`h-10 ${style.messageFollowButton}`}
            onClick={() => console.error("IMPLEMENT GO TO CHAT")}
          >
            <h4>Message</h4>
          </IonButton>
          <div className="flex">
            <IonButton
              //className={`h-9 w-1/2 ${style.messageFollowButton}`}
              onClick={() => console.error("IMPLEMENT FOLLOW/UNFOLLOW")}
            >
              <h4>Follow</h4>
            </IonButton>
            <IonButton
              className="h-9 w-1/2"
              onClick={() =>
                console.error("IMPLEMENT GO TO CREATOR SUBSCRIPTIONS")
              }
            >
              <h4>Subscribe</h4>
            </IonButton>
          </div>
        </div>
      </div>
      <div className="flex flex-col pt-6">
        <h2 className="pl-2">{p.username}</h2>
        <h4 className="mb-1 text-[#ADADAD] pl-2">
          {p.first_name + " " + p.last_name}
        </h4>
        <CollapsableText text={p.username} paddingLeft={2} />
      </div>
    </div>
  );

  const renderYourProfileHeader = (p: ProfileWithDish) => (
    <div className="flex flex-col px-6 mb-5 rounded-b-3xl">
      <div className="flex justify-between">
        <div
          className="flex h-24 w-24 relative"
          onClick={() => console.error("IMPLEMENT CHANGE PICTURE")}
        >
          <img
            src={p.profile_picture}
            alt="profile"
            className="rounded-full w-24"
          />
          <div className="h-8 w-8 absolute bottom-0 right-0 bg-white rounded-full">
            <IonIcon
              icon={addCircle}
              size="large"
              // className={`${style.blueIcon} `}
            />
          </div>
        </div>
        <div className="flex h-24 w-56 flex-col">
          <IonButton
            shape="round"
            color={"medium"}
            fill="solid"
            //className={`w-full h-1/2 ${style.editProfileButton}`}
            onClick={() => console.error("IMPLEMENT GO TO PROFILE SETTINGS")}
          >
            <h4 className="text-[#909090]">Edit profile</h4>
          </IonButton>
        </div>
      </div>
      <div className="flex flex-col pt-6">
        <h2>{p.username}</h2>
        <h4 className="mb-2 text-[#ADADAD]">
          {p.first_name + " " + p.last_name}
        </h4>
      </div>
    </div>
  );

  return (
    <IonPage>
      <AuthHeader
        title="Foodzilla"
        icon={chevronBack}
        onClick={() => history.goBack()}
      />

      <IonContent className="w-full h-full px-5">
        {isYourProfile
          ? profile && renderYourProfileHeader(profile)
          : profile && renderProfileHeader(profile)}
        {profile &&
          dish &&
          Object.values(dish).map((dish) => (
            <DishCard
              key={dish.id}
              dishSrc={dish.recipe_picture}
              dishTitle={dish.title}
              onClick={function (e: {
                preventDefault: () => void;
              }): Promise<void> {
                throw new Error("Function not implemented.");
              }}
            />
          ))}
      </IonContent>
    </IonPage>
  );
};

export default ProfileScreen;
