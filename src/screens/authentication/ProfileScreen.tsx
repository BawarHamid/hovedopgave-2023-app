import { IonButton, IonContent, IonIcon, IonImg, IonItem, IonList, IonPage } from "@ionic/react";
import AppHeader from "../../components/generic/headers/app-header/AppHeader";
import {
  addCircle,
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
import style from "antd/es/alert/style";

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
    getProfileWithDish(match.params.id).then((response) => {
      setProfile(response);
      setDish(response.dish)
    });
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

  const renderYourProfileHeaders = (dish: Dish) => {
    return (
      <IonItem key={dish.id} className="w-full" lines="none">
        <IonImg src={dish.recipe_picture} />
        <h5 className="pl-8">{dish.title}</h5>
        <h5 className="pl-8">{dish.description}</h5>
        <h5 className="pl-8">{dish.recipe}</h5>
      </IonItem>
    );
  };

  const renderYourProfileHeader = (p: ProfileWithDish) => (
    <div className="flex flex-col px-6 mb-5 rounded-b-3xl">
      <div className="flex justify-between">
        <div className="flex h-24 w-24 relative" onClick={() => console.error('IMPLEMENT CHANGE PICTURE')}>
          <img src={p.profile_picture} alt="profile" className="rounded-full w-24" />
          <div className="h-8 w-8 absolute bottom-0 right-0 bg-white rounded-full">
            <IonIcon icon={addCircle} size="large" className={`${style.blueIcon} `} />
          </div>
        </div>
        <div className="flex h-24 w-56 flex-col">
          
          <IonButton
            shape="round"
            color={'medium'}
            fill="solid"
            className={`w-full h-1/2 ${style.editProfileButton}`}
            onClick={() => console.error('IMPLEMENT GO TO PROFILE SETTINGS')}
          >
            <h4 className="text-[#909090]">Edit profile</h4>
          </IonButton>
        </div>
      </div>
      <div className="flex flex-col pt-6">
        <h2>{p.username}</h2>
        <h4 className="mb-2 text-[#ADADAD]">{p.first_name + ' ' + p.last_name}</h4>
        <div className="flex">{p.dish.map((dish) => renderYourProfileHeaders(dish))}</div>
      </div>
    </div>
  );

  return (
    <IonPage>
      <AppHeader
        //titleColor="black"
        backIcon={{ icon: `${chevronBack}` }}
        addIcon={{ icon: `${addCircleOutline}` }}
        chatIcon={{ icon: `${chatbubbleEllipsesOutline}` }}
      />

      <IonContent className="w-full h-full px-5">
        {profile && <div>{renderYourProfileHeader(profile)}</div>}
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
                  }) => renderYourProfileHeaders(dish)
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
