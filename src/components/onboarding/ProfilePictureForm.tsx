import { IonButton, IonIcon, IonImg } from '@ionic/react';
import { uploadProfilePicture } from 'apis/services/uploadFile.service';
import { insertNewProfile } from 'apis/supabase/profile';
import { camera, chevronBack } from 'ionicons/icons';
import React, { useRef, useState } from 'react';
import { useProfileSetup } from 'store/setup-profile';
import { useAuthUserStore } from 'store/user';
import { ProfileInsert } from 'types/types';
import { Center } from '../generic/wrappers/Center';
import FlowHeader from '../generic/headers/auth-header/AuthHeader';
import RegularButton from '../generic/styled-regulars/button/RegularButton';
import styles from './ProfilePicture.module.css';

type Props = {
  pageUp: () => void;
  pageDown: () => void;
};

const ProfilePictureForm: React.FC<Props> = ({ pageUp, pageDown }) => {
  const [file, setFile] = useState<File | undefined>();
  const inputRef = useRef<HTMLInputElement>(null);
  const userId = useAuthUserStore((state) => state.authUser?.id);
  const profile = useProfileSetup();

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      setFile(files[0]);

      Array.from(e.target.files).map(
        (file) => URL.revokeObjectURL(String(file)) // avoid memory leak
      );
    }
  };

  const handleContinue = async () => {
    if (file) {
      const uploadData = await uploadProfilePicture(file);

      const profileToInsert: ProfileInsert = {
        id: userId,
        first_name: profile.first_name,
        last_name: profile.last_name,
        username: profile.username,
        bio: profile.biography,
        profile_picture: uploadData ? uploadData.data.url : '',
      };
      profile.setProfilePicture(uploadData?.data.url || '');
      await insertNewProfile(profileToInsert);
    }
    pageUp();
  };

  return (
    <>
      <FlowHeader
        title="Add a profile picture"
        text="To enhance the Innrcircle experience, add a profile picture to your unique profile."
        iconPosition="left"
        icon={chevronBack}
        onClick={pageDown}
      />
      <Center>
        <IonButton className={`${styles.rounded}`} color="light" onClick={handleClick}>
          {!file ? <IonIcon icon={camera} size="large" color="medium" /> : <IonImg className="h-full object-cover w-full" src={URL.createObjectURL(file)} />}
        </IonButton>

        <input style={{ display: 'none' }} ref={inputRef} type="file" onChange={handleImageChange} accept="image/png, image/jpeg" />
        <h4 className="mt-5">Click here to upload a profile picture</h4>
      </Center>
      <div className="my-10" />
      <RegularButton text="Continue" onClick={handleContinue} />
    </>
  );
};

export default ProfilePictureForm;
