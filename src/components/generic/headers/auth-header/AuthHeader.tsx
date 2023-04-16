import { IonIcon } from '@ionic/react';
import React, { ReactElement } from 'react';
import './AuthHeader.module.css';

type AuthHeaderProps = {
  title?: string;
  text?: string;
  customText?: ReactElement;
  onClick?: ((e: { preventDefault: () => void }) => Promise<void>) | (() => void);
  iconPosition?: 'left' | 'right';
  icon?: string;
};

const AuthHeader: React.FC<AuthHeaderProps> = ({ title = '', text = '', onClick, iconPosition = 'left', icon = undefined, customText = undefined }) => {
  return (
    <div className="my-10">
      <div className="flex flex-row items-center justify-center py-4 relative">
        {icon ? <IonIcon onClick={onClick} icon={icon} className={`absolute ${iconPosition === 'left' ? 'left-0' : 'right-0'} `} /> : null}
        {title ? <h1 className="font-semibold">{title}</h1> : null}
      </div>

      {customText ? (
        <div className="flex mx-6 justify-center">{customText}</div>
      ) : (
        <div className="flex mx-6 justify-center">{text ? <h4 className="text-center">{text}</h4> : null}</div>
      )}
    </div>
  );
};
export default AuthHeader;
