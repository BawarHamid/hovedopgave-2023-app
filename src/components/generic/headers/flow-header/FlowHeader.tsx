import { IonIcon } from '@ionic/react';
import React from 'react';

type RightButtonProps = {
  text: string;
  onClick: () => void;
};

type LeftButtonProps = {
  icon: string;
  onClick: () => void;
};

type Props = {
  prefix?: string;
  flowTitle: string;
  leftButton?: LeftButtonProps;
  rightButtonText?: RightButtonProps;
  rightButtonIcon?: LeftButtonProps;
};

// README: rightButton text must be a short word like 'Preview' or 'Next' to fit in the header
const FlowHeader: React.FC<Props> = ({ prefix, flowTitle, leftButton, rightButtonText, rightButtonIcon }) => {
  const getFullTitle = () => {
    if (prefix) {
      return (
        <>
          <span className="text-[#909090]">{prefix}</span>
          <span className="text-[#909090]"> - </span>
          {flowTitle}
        </>
      );
    } else {
      return flowTitle;
    }
  };

  return (
    <div className="flex flex-row h-16">
      <div className="flex h-full w-[25%] items-center pl-3">{leftButton && <IonIcon icon={leftButton.icon} onClick={leftButton.onClick} />}</div>
      <div className="flex h-full w-full items-center justify-center">
        <h3 className="text-brand-black">{getFullTitle()}</h3>
      </div>
      <div className="flex h-full w-[25%] items-center pr-3">
        {rightButtonText && (
          <h3 onClick={rightButtonText.onClick} className="text-red-600">
            {rightButtonText.text}
          </h3>
        )}
        {rightButtonIcon && <IonIcon icon={rightButtonIcon.icon} onClick={rightButtonIcon.onClick} className="absolute right-4" />}
      </div>
    </div>
  );
};

export default FlowHeader;
