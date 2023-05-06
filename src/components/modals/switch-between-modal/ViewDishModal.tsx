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
} from "@ionic/react";
import { Dish } from "../../../types/types";
import {
  bookmarkOutline,
  closeCircleOutline,
  shareOutline,
} from "ionicons/icons";
import styles from "./ViewDishModal.module.css";
import { useState } from "react";
import DescriptionCard from "../../content/cards/DescriptionCard";
import RecipeCard from "../../content/cards/RecipeCard";

type ViewDishModalProps = {
  selectedDish: Dish;
  modalRef: React.RefObject<HTMLIonModalElement>;
};

const ViewDishModal: React.FC<ViewDishModalProps> = ({
  modalRef,
  selectedDish,
}) => {
  // const [checked, setChecked] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState<string>("");

  return (
    <IonModal
      ref={modalRef}
      trigger="open-modal"
      isOpen={!!selectedDish}
      className="shadow-none"
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
            value={selectedSegment}
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
