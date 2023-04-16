import { IonCheckbox, IonIcon, IonItem, IonList } from '@ionic/react';
import { getContentCategories } from 'apis/supabase/contentCategory';
import React, { useEffect, useState } from 'react';
import { ContentCategory } from 'types/types';
import FlowHeader from '../generic/headers/auth-header/AuthHeader';
import RegularButton from '../generic/styled-regulars/button/RegularButton';
import { getIonicon } from 'apis/services/icon.service';
import { insertInterests } from 'apis/supabase/interest';
import { useAuthUserStore } from 'store/user';

type Props = {
  pageUp: () => void;
};

const InterestsForm: React.FC<Props> = ({ pageUp }) => {
  const [interests, setInterests] = useState<ContentCategory[]>();
  const [chosenInterests, setChosenInterests] = useState<string[]>([]);
  const userId = useAuthUserStore((state) => state.authUser?.id);

  const handleClick = async () => {
    userId && (await insertInterests(userId, chosenInterests));
    pageUp();
  };

  const renderItem = (interest: ContentCategory) => {
    return (
      <IonItem key={interest.id} className="w-full" lines="none">
        <IonIcon icon={getIonicon(interest.icon)} size="large" color="danger" className="py-4" />
        <h4 className="pl-8">{interest.title}</h4>
        <IonCheckbox
          slot="end"
          value={interest.id}
          onIonChange={(e) => {
            const checked = e.detail.checked;
            if (checked) setChosenInterests((prev) => [...prev, e.detail.value]);
            else setChosenInterests((prev) => prev.filter((id) => id !== e.detail.value));
          }}
        />
      </IonItem>
    );
  };

  useEffect(() => {
    getContentCategories().then((cc) => cc.data && setInterests(cc.data));
  }, []);

  return (
    <>
      <FlowHeader title="Choose interests" text="We would like to give you some suggestions on what might catch your interest." />
      <IonList>
        {interests && (
          <>
            {interests.map((interest) => renderItem(interest))}
            <div className="mt-7" />
            <RegularButton text="Continue" onClick={handleClick} />
          </>
        )}
      </IonList>
    </>
  );
};

export default InterestsForm;
