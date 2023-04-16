import React, { useEffect, useState } from 'react';
import { useProfileSetup } from 'store/setup-profile';
import FlowHeader from '../generic/headers/auth-header/AuthHeader';
import FormWrapper from '../generic/wrappers/FormWrapper';
import RegularButton from '../generic/styled-regulars/button/RegularButton';
import RegularInput from '../generic/styled-regulars/input/RegularInput';

type Props = {
  pageUp: () => void;
};

const NameForm: React.FC<Props> = ({ pageUp }) => {
  const store = useProfileSetup();
  const [firstName, setFirstname] = useState(store.first_name);
  const [lastName, setLastname] = useState(store.last_name);
  const [isDisabled, setIsDisabled] = useState(true);

  const handleContinue = () => {
    const firstNameTrimmed = firstName.trim();
    const lastNameTrimmed = lastName.trim();
    store.setProfileNames(firstNameTrimmed, lastNameTrimmed);
    pageUp();
  };

  useEffect(() => {
    const firstNameTrimmed = firstName.trim();
    const lastNameTrimmed = lastName.trim();
    if (firstNameTrimmed.length > 0 && lastNameTrimmed.length > 0) setIsDisabled(false);
    else setIsDisabled(true);
  }, [firstName, lastName]);

  return (
    <>
      <FlowHeader title="Tell us about you" text="Put in your full name to setup your profile." />
      <FormWrapper>
        <RegularInput value={firstName} changeCallback={setFirstname} placeholder="First name" />
        <RegularInput value={lastName} changeCallback={setLastname} placeholder="Last name" />
        <RegularButton text="Continue" onClick={handleContinue} disabled={isDisabled} />
      </FormWrapper>
    </>
  );
};

export default NameForm;
