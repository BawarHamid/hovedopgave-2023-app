import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonLabel,
  IonModal,
  IonSegment,
  IonSegmentButton,
  IonToolbar,
  useIonAlert,
  useIonLoading,
} from "@ionic/react";
import { Dish } from "../../../types/types";
import {
  bookmarkOutline,
  closeCircleOutline,
  shareOutline,
  trashOutline,
} from "ionicons/icons";
import styles from "./ViewDishModal.module.css";
import { useState } from "react";
import DescriptionCard from "../../content/cards/DescriptionCard";
import RecipeCard from "../../content/cards/RecipeCard";
import { useAuthUserStore } from "../../../store/user";
import { DeleteDishByID } from "../../../apis/supabase/dish";

//Modal types
type ViewDishModalProps = {
  selectedDish: Dish;
  modalRef: React.RefObject<HTMLIonModalElement>;
};

const ViewDishModal: React.FC<ViewDishModalProps> = ({
  modalRef,
  selectedDish,
}) => {
  // ion state and hooks
  const [selectedSegment, setSelectedSegment] = useState<string>("description");
  const [present, dismiss] = useIonLoading();
  const [presentAlert] = useIonAlert();
  const resetSegment = () => {
    setSelectedSegment("description");
  };

  // global state
  const userId = useAuthUserStore((state) => state.authUser?.id);

  //submit form for delete
  const handleDelete = async () => {
    if (userId === selectedDish.profile_fk) {
      await present({ message: "Deleting dish..." });
      DeleteDishByID(selectedDish.id);
      await dismiss();
      await presentAlert({
        header: "Delete successful",
        message: "Your dish was deleted successfully!",
        buttons: ["OK"],
      });
    } else {
      await dismiss();
      await presentAlert({
        header: "An error occured",
        message: "Incorrect user - Only creator of the dish can delete!",
        buttons: ["OK"],
      });
    }
  };

  return (
    //trigger for modal
    <IonModal
      ref={modalRef}
      trigger="open-modal"
      isOpen={!!selectedDish}
      className="shadow-none"
      onDidDismiss={resetSegment}
    >
      <IonContent>
        <IonHeader>
          <IonToolbar className="bg-black">
            <IonButtons slot="start">
              <IonButton onClick={() => modalRef.current?.dismiss()}>
                <IonIcon icon={closeCircleOutline} size="large" />
              </IonButton>
            </IonButtons>
            <div>
              <h2 className="text-center ml-5">{selectedDish?.title}</h2>
            </div>

            <IonButtons slot="end">
              <IonButton
                onClick={() => console.error("SHARE RECIPE FUNC IS MISSING!")}
              >
                <IonIcon icon={shareOutline} />
              </IonButton>

              <IonButton
                onClick={() => console.error("SAVE RECIPE FUNC IS MISSING!")}
              >
                <IonIcon icon={bookmarkOutline} />
              </IonButton>

              <IonButton
                onClick={() => {
                  handleDelete();
                  modalRef.current?.dismiss();
                }}
              >
                <IonIcon icon={trashOutline} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonImg
          src={selectedDish.recipe_picture}
          className="h-[15rem] object-cover"
        />
        <div className="flex justify-center top-[13.30rem] w-full h-10 bg-white bg-opacity-80 absolute items-center">
          <h6 className="text-black font-semibold text-[1rem]">
            {selectedDish.title}
          </h6>
        </div>

        <div className="mt-3 mx-10">
          <IonSegment
            value={selectedSegment || "description"}
            className="rounded-full bg-blue-200"
            onIonChange={(e) =>
              setSelectedSegment(e.detail.value?.toString() ?? "")
            }
          >
            <IonSegmentButton
              value="description"
              className={`${styles} mx-2 my-1`}
            >
              <IonLabel>Description</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="recipe" className={`${styles} mx-2 my-1`}>
              <IonLabel>Recipe</IonLabel>
            </IonSegmentButton>
          </IonSegment>
          <div>
            {selectedSegment === "description" && (
              <div>
                <DescriptionCard descriptionText={selectedDish.description} />
              </div>
            )}
            {selectedSegment === "recipe" && (
              <div>
                <RecipeCard recipeText={selectedDish.recipe} />
              </div>
            )}
          </div>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default ViewDishModal;
