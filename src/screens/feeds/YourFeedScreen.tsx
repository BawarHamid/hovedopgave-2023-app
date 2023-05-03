import {
  IonContent,
  IonList,
  IonPage,
  IonSpinner,
  useIonRouter,
} from "@ionic/react";
import AppHeader from "../../components/generic/headers/app-header/AppHeader";
import { addCircle, chevronBack } from "ionicons/icons";
import { useHistory } from "react-router";
import DishCard from "../../components/content/cards/DishCard";
import { useEffect, useState } from "react";
import { useAuthUserStore } from "../../store/user";
import { getAllDishes } from "../../apis/supabase/dish";
import { Dish } from "../../types/types";

const YourFeedScreen: React.FC = () => {
  const history = useHistory();
  const router = useIonRouter();
  const [alldishes, setAllDishes] = useState<Dish[]>();

  // global state
  const authUser = useAuthUserStore((state) => state.authUser);

  // route protection and fetch profile
  useEffect(() => {
    if (!authUser) router.push("/login");
    if (authUser) getAllDishes().then((d) => d.data && setAllDishes(d.data));
  }, [router, authUser]);

  return (
    <IonPage>
      <IonContent>
        <AppHeader
          backIcon={{
            icon: chevronBack,
            onClick: () => {
              history.goBack();
            },
          }}
          profileIcon={{
            icon: addCircle,
            onClick: () => {
              router.push("/select-type");
            },
          }}
        />

        <div className="flex justify-start text-[1.3rem] ml-6 pt-4 text-[rgb(157,159,166)]">
          Your Feed!
        </div>

        {/* {alldishes?.map((d) => (
          <>
            <DishCard dishSrc={d.recipe_picture} dishTitle={d.title} />
          </>
        ))} */}

        {alldishes ? (
          <>
            {alldishes?.map((d) => (
              <DishCard dishSrc={d.recipe_picture} dishTitle={d.title} />
            ))}
          </>
        ) : (
          <div className="flex justify-center">
            <h2>Loading dishes from db...</h2>
            <IonSpinner />
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default YourFeedScreen;
