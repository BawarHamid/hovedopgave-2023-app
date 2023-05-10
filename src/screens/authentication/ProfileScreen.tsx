import { IonContent, IonImg, IonItem, IonList, IonPage } from "@ionic/react";
import AppHeader from "../../components/generic/headers/app-header/AppHeader";
import {
  addCircleOutline,
  chatbubbleEllipsesOutline,
  chevronBack,
} from "ionicons/icons";
import ProfileCard from "../../components/generic/Profile/ProfileCard";
import profileImg from "../../static/assets/img/dummy-data/foodzillaIcon.png";
import { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router";
import { useAuthUserStore } from "../../store/user";
import { Dish, Profile, ProfileWithDish } from "../../types/types";
import { getProfileWithDish } from "../../apis/supabase/profile";

type ProfilePageProps = RouteComponentProps<{
  id: string;
}>;

const ProfileScreen: React.FC<ProfilePageProps> = ({ match }) => {
  // profile fetched with interests
  const userId = useAuthUserStore((state) => state.authUser?.id);
  const [profile, setProfile] = useState<ProfileWithDish>();
  const [isYourProfile, setIsYourProfile] = useState<boolean>(false);
  const [dish, setDish] = useState<Dish[] | Dish>();

  useEffect(() => {
    getProfileWithDish(match.params.id).then(
      (response) => {
        response?.dish && setDish(response.dish);
        response && setProfile(response);
      }
    );
  }, [match.params.id]);

  useEffect(() => setIsYourProfile(userId === profile?.id), [userId, profile]);

  console.log(profile);
  console.log(isYourProfile);

  const renderDish = (dish: string) => <div className="flex">{`#${dish}`}</div>;

  const renderProfileHeader = (profile: Profile) => {
    return (
      <ProfileCard
        username={profile.username}
        profileImg={profile.profile_picture}
        profileDescription={profile.first_name}
      ></ProfileCard>
    );
  };

  const renderYourProfileHeader = (dish: Dish) => {
    return (
      <IonItem key={dish.id} className="w-full" lines="none">
        <IonImg src={dish.recipe_picture} />
        <h5 className="pl-8">{dish.title}</h5>
        <h5 className="pl-8">{dish.description}</h5>
        <h5 className="pl-8">{dish.recipe}</h5>
      </IonItem>
    );
  };

  return (
    <IonPage>
      <AppHeader
        titleColor="black"
        backIcon={{ icon: `${chevronBack}` }}
        addIcon={{ icon: `${addCircleOutline}` }}
        chatIcon={{ icon: `${chatbubbleEllipsesOutline}` }}
      />

      <IonContent className="w-full h-full px-5">
        {profile && <div>{renderProfileHeader(profile)}</div>}
        <IonImg>{profile?.profile_picture}</IonImg>
        <div>
          <IonList>
            {dish && (
              <>
                {Object.values(dish).map(
                  (dish: {
                    description: string;
                    id: number;
                    profile_fk: string;
                    recipe: string;
                    recipe_picture: string;
                    title: string;
                  }) => renderYourProfileHeader(dish)
                )}
              </>
            )}
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ProfileScreen;
