import { IonItem, IonInput } from "@ionic/react";
import React from "react";
import styles from "./RegularInput.module.css";

type Props = {
  value: string;
  placeholder?: string;
  changeCallback: React.Dispatch<React.SetStateAction<string>>;
};

const RegularInput: React.FC<Props> = ({
  value,
  placeholder = "",
  changeCallback,
}) => {
  return (
    <>
      <IonItem lines="none" className={"border border-brand-tint"}>
        <IonInput
          value={value}
          placeholder={placeholder}
          onIonChange={(e) => changeCallback(e.detail.value?.toString() ?? "")}
          type={"text"}
          required
          className={`h-[3rem] items-center text-sm text-brand-grey ${styles.placeholderColor}`}
        />
      </IonItem>
    </>
  );
};

export default RegularInput;
