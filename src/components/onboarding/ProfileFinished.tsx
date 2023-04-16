import { IonIcon, IonImg } from '@ionic/react';
import { getProfile } from 'apis/supabase/profile';
import React, { useEffect, useState } from 'react';
import { useAuthUserStore } from 'store/user';
import { Profile } from 'types/types';
import { Center } from '../generic/wrappers/Center';
import FlowHeader from '../generic/headers/auth-header/AuthHeader';
import RegularButton from '../generic/styled-regulars/button/RegularButton';
import { checkmarkCircle } from 'ionicons/icons';

type Props = {
  pageUp: () => void;
};

const ProfileFinished: React.FC<Props> = ({ pageUp }) => {
  const [profile, setProfile] = useState<Profile>();
  const userId = useAuthUserStore((state) => state.authUser?.id);

  useEffect(() => {
    if (userId) getProfile(userId).then((p) => p.data && setProfile(p.data));
  }, []);

  return (
    <>
      <FlowHeader title="You are Innrcircle proof" text="Your profile is now complete and you are now ready to surf through Innrcircle" />
      <Center>
        <div className="rounded-full overflow-hidden h-28 w-28 mb-5">
          <IonImg src={profile?.profile_picture} className={'h-full object-cover w-full'} />
        </div>
        <h2 className="flex justify-center mb-1">
          {profile?.username} <IonIcon className="pl-1 text-[#00ACEE]" icon={checkmarkCircle} />
        </h2>
        <h4 className="mb-11">{`${profile?.first_name} ${profile?.last_name}`}</h4>
      </Center>
      <RegularButton text="Continue" onClick={pageUp} />
    </>
  );
};

export default ProfileFinished;
