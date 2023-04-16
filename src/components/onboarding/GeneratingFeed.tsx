import { IonImg, useIonRouter } from '@ionic/react';
import React, { createRef, RefObject, useEffect } from 'react';
import { useProfileSetup } from 'store/setup-profile';
import FlowHeader from '../generic/headers/auth-header/AuthHeader';
import { CreateAnimation } from '@ionic/react';

type Props = {
  pageUp: () => void;
};

const GeneratingFeed: React.FC<Props> = ({ pageUp }) => {
  const profile = useProfileSetup();
  const router = useIonRouter();

  const ring1: RefObject<CreateAnimation> = createRef();
  const ring2: RefObject<CreateAnimation> = createRef();

  useEffect(() => {
    ring1.current?.animation.play();
    ring2.current?.animation.play();
    setTimeout(() => {
      router.push('/your-feed');
    }, 5500);
  }, []);

  const animation = (delay: number, ref: RefObject<CreateAnimation>) => {
    return (
      <CreateAnimation
        ref={ref}
        duration={4000}
        delay={delay}
        iterations={Infinity}
        fromTo={[
          { property: 'scale', fromValue: 0, toValue: 15 },
          { property: 'opacity', fromValue: 1, toValue: 0 },
          { property: 'transform', fromValue: 'rotateX(50deg)', toValue: 'rotateX(50deg)' },
        ]}
      >
        <div className={'absolute border-[#F20505] border h-[50px] w-[50px] rounded-full z-0'}></div>
      </CreateAnimation>
    );
  };

  return (
    <div className="flex flex-col h-screen">
      <FlowHeader title="Generating your personal feed" text="This will only take a moment" />
      <div className="flex justify-center items-center h-3/5">
        <div className="rounded-full overflow-hidden h-28 w-28 mb-5 justify-center flex items-end">
          {animation(1500, ring1)}
          {animation(0, ring2)}
          <IonImg src={profile?.profile_picture} className={'h-full object-cover w-full z-10'} />
        </div>
      </div>
    </div>
  );
};

export default GeneratingFeed;
