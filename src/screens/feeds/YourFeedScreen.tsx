import { IonContent, IonPage, IonSpinner, useIonRouter } from "@ionic/react";
import AppHeader from "../../components/generic/headers/app-header/AppHeader";
import {
  addCircleOutline,
  chevronBack,
  personCircleOutline,
} from "ionicons/icons";
import { useHistory } from "react-router";
import DishCard from "../../components/content/cards/DishCard";
import { useEffect, useRef, useState } from "react";
import { useAuthUserStore } from "../../store/user";
import { getAllDishes } from "../../apis/supabase/dish";
import { Dish } from "../../types/types";
import ViewDishModal from "../../components/modals/view-dish-modal/ViewDishModal";

const YourFeedScreen: React.FC = () => {
  const history = useHistory();
  const router = useIonRouter();
  const [alldishes, setAllDishes] = useState<Dish[]>();
  const [selectedDish, setSelectedDish] = useState<Dish>();
  const modalRef = useRef<HTMLIonModalElement>(null);
  const authUser = useAuthUserStore((state) => state.authUser);

  useEffect(() => {
    if (!authUser) router.push("/login");
    if (authUser)
      getAllDishes().then((d) => {
        d.data && setAllDishes(d.data);
      });
  }, [router, authUser, alldishes]);

  const openViewDishModal = (dish: Dish) => {
    setSelectedDish(dish);
    modalRef.current?.present();
  };

  return (
    <IonPage>
      <IonContent>
        {selectedDish && (
          <ViewDishModal modalRef={modalRef} selectedDish={selectedDish} />
        )}
        <AppHeader
          backIcon={{
            icon: chevronBack,
            onClick: () => {
              history.goBack();
            },
          }}
          addIcon={{
            icon: addCircleOutline,
            onClick: () => {
              router.push("/select-type");
            },
          }}
          profileIcon={{
            icon: personCircleOutline,
            onClick: () => {
              router.push(`/profile/${authUser?.id}`);
            },
          }}
        />

        <div className="flex justify-start text-[1.3rem] ml-6  text-[rgb(157,159,166)]">
          Your Feed!
        </div>
        <div className="mt-[-15px]">
          {alldishes ? (
            <>
              {alldishes?.map((d) => (
                <DishCard
                  key={d.id}
                  dishSrc={d.recipe_picture}
                  dishTitle={d.title}
                  onClick={() => openViewDishModal(d)}
                />
              ))}
            </>
          ) : (
            <div className="flex justify-center mt-48">
              <h2>Please wait..</h2>
              <IonSpinner />
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};
export default YourFeedScreen;
