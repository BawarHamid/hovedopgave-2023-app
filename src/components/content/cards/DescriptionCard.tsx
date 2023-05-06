import { IonCard } from "@ionic/react";

type DescriptionCardProps = {
  descriptionText: string;
};

//mangler styling til flottere tekst, afstand mellem linjerne mm..?.
const DescriptionCard: React.FC<DescriptionCardProps> = ({
  descriptionText,
}) => {
  return (
    <IonCard className="mx-2 rounded-3xl">
      <h6 className="text-brand-black text-sm mx-6 my-4 flex justify-center">
        {descriptionText}
      </h6>
    </IonCard>
  );
};

export default DescriptionCard;
