import { IonIcon, IonImg, IonText } from '@ionic/react';
import React from 'react';
import style from './AppHeader.module.css';
import logoBlack from 'static/assets/img/innrcircleBlack.svg';
import logoWhite from 'static/assets/img/innrcircleWhite.svg';

type Icon = {
  icon: string;
  onClick?: ((e: { preventDefault: () => void }) => Promise<void>) | (() => void);
};

type AppHeaderProps = {
  logoColor?: 'black' | 'white';
  backIcon?: Icon;
  skipIcon?: Icon;
  addIcon?: Icon;
  chatIcon?: Icon;
};

// test on phone if notification bar pushes or goes over contet
const AppHeader: React.FC<AppHeaderProps> = ({ logoColor = 'black', skipIcon, backIcon, addIcon, chatIcon }) => {
  const isLogoLeft = addIcon && chatIcon && !backIcon && !skipIcon ? true : false;
  const isLogoLeftAndBackIcon = addIcon && chatIcon && backIcon && !skipIcon ? true : false;

  return (
    <div className={`${logoColor === 'white' && 'bg-transparent'} flex ${isLogoLeft && 'justify-between'} px-5 py-10`}>
      {backIcon && (
        <div className={`flex ${isLogoLeftAndBackIcon ? 'w-1/3' : 'w-1/5'} items-end`}>
          <IonIcon icon={backIcon.icon} size="large" className={`${logoColor === 'white' ? style.whiteIcon : style.blackIcon}`} onClick={backIcon.onClick} />
        </div>
      )}
      <div className={`flex w-3/5 ${!isLogoLeft && 'justify-center'}`}>
        {logoColor === 'black' ? <IonImg className="w-[7.5rem]" src={logoBlack} /> : <IonImg className="w-[7.5rem]" src={logoWhite} />}
      </div>
      <div className={`flex ${!isLogoLeftAndBackIcon ? 'w-1/5' : 'w-full'} items-end justify-end`}>
        {skipIcon && (
          <IonText className="text-l text-red-600" onClick={skipIcon.onClick}>
            Skip
          </IonText>
        )}
        {addIcon && chatIcon && (
          <div className="flex">
            <IonIcon icon={addIcon.icon} size="large" className="pr-2" onClick={addIcon.onClick} />
            <IonIcon icon={chatIcon.icon} size="large" onClick={chatIcon.onClick} />
          </div>
        )}
      </div>
    </div>
  );
};
export default AppHeader;
