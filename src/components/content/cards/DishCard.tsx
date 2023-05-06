import { IonButton, IonButtons, IonCard, IonIcon, IonImg } from "@ionic/react";
import { ellipsisVertical } from "ionicons/icons";

type DishCardProps = {
  dishSrc: string;
  dishTitle: string;
  onClick:
    | ((e: { preventDefault: () => void }) => Promise<void>)
    | (() => void);
};

const DishCard: React.FC<DishCardProps> = ({ dishSrc, dishTitle, onClick }) => {
  return (
    <IonCard className="mx-6 rounded-xl">
      <IonButtons className="flex justify-end mt-3 bg-black bg-opacity-60 rounded-full border-0 absolute ml-2">
        <IonButton>
          <IonIcon icon={ellipsisVertical} className="text-white" />
        </IonButton>
      </IonButtons>

      <IonImg
        onClick={onClick}
        src={dishSrc}
        className="object-cover overflow-hidden self-center h-[13rem]"
      />

      <div
        className="flex justify-center mt-[-70px] w-full h-10 bg-white bg-opacity-60 absolute items-center"
        onClick={onClick}
      >
        <h6 className="text-brand-black font-semibold text-[1rem]">
          {dishTitle}
        </h6>
      </div>
    </IonCard>
  );
};

export default DishCard;
