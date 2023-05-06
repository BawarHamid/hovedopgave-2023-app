import { IonItem, IonTextarea } from "@ionic/react";
import React from "react";
import styles from "./RegularTextArea.module.css";

type Props = {
  value: string;
  placeholder?: string;
  changeCallback: React.Dispatch<React.SetStateAction<string>>;
};

const RegularTextArea: React.FC<Props> = ({
  value,
  placeholder = "",
  changeCallback,
}) => {
  const maxlength = 600;

  return (
    <>
      <IonItem
        lines="none"
        color={"white-background"}
        className={"border border-brand-tint"}
      >
        <IonTextarea
          maxlength={maxlength}
          rows={5}
          value={value}
          placeholder={placeholder}
          onIonChange={(e) => changeCallback(e.detail.value ?? "")}
          required
          class={`text-xs text-brand-grey ${styles.placeholderColor}`}
        />
      </IonItem>
      <div className="flex justify-end">
        <h6 className="text-[0.5625rem]">
          {value.length} / {maxlength}
        </h6>
      </div>
    </>
  );
};

export default RegularTextArea;
