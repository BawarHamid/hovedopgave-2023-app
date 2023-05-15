import { IonCard } from "@ionic/react";

type RecipeCardProps = {
  recipeText: string;
};

//mangler styling til punktform måske? og afstand mellem linjerne..
const RecipeCard: React.FC<RecipeCardProps> = ({ recipeText }) => {
  return (
    <IonCard className="mx-2 rounded-3xl">
      <h6 className="text-brand-black text-sm mx-6 my-4 flex justify-center">
        {recipeText}
      </h6>
    </IonCard>
  );
};

export default RecipeCard;
