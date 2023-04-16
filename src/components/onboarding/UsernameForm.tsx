import { IonToast } from '@ionic/react';
import { supabase } from 'apis/supabase/supabaseClient';
import { chevronBack } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useProfileSetup } from 'store/setup-profile';
import FlowHeader from '../generic/headers/auth-header/AuthHeader';
import FormWrapper from '../generic/wrappers/FormWrapper';
import RegularButton from '../generic/styled-regulars/button/RegularButton';
import RegularInput from '../generic/styled-regulars/input/RegularInput';
import RegularTextArea from '../generic/styled-regulars/textarea/RegularTextArea';

type Props = {
  pageUp: () => void;
  pageDown: () => void;
};

const UsernameForm: React.FC<Props> = ({ pageUp, pageDown }) => {
  const store = useProfileSetup();
  const [username, setUsername] = useState(store.username);
  const [biography, setBiography] = useState(store.biography);
  const [isDisabled, setIsDisabled] = useState(true);
  const [showToast, setShowToast] = useState(false);

  const validateUsernameDoesNotExist = async () => {
    const { data } = await supabase.from('profile').select('username').eq('username', username.trim());
    return data?.length === 0 ? true : false;
  };

  const handleContinue = async () => {
    const doesNotExist = await validateUsernameDoesNotExist();

    if (doesNotExist) {
      store.setProfileUsernameAndBio(username.trim(), biography.trim());
      pageUp();
    } else {
      setShowToast(true);
    }
  };

  useEffect(() => {
    if (username.trim().length > 0 && biography.trim().length > 0) setIsDisabled(false);
    else setIsDisabled(true);
  }, [username, biography]);

  return (
    <>
      <FlowHeader
        title="Choose your username"
        text="Put in the username and biography you want for your account. This can be changed again later."
        iconPosition="left"
        icon={chevronBack}
        onClick={pageDown}
      />
      <FormWrapper>
        <RegularInput value={username} changeCallback={setUsername} placeholder="Username" />
        <RegularTextArea value={biography} changeCallback={setBiography} placeholder="Biography" />
        <RegularButton text="Continue" onClick={handleContinue} disabled={isDisabled} />
      </FormWrapper>
      <IonToast
        isOpen={showToast}
        color="danger"
        position="top"
        onDidDismiss={() => setShowToast(false)}
        message="Username was already taken."
        duration={1500}
      />
    </>
  );
};

export default UsernameForm;
