import { IonCardHeader, IonCard, IonCardContent, IonImg, IonIcon, IonCardTitle, IonCardSubtitle } from '@ionic/react';
import { ellipsisHorizontal } from 'ionicons/icons';
import styles from './card.module.css';

type PostCardProps = {
  avatarSrc: string;
  creatorUsername: string;
  postDescription: string;
  uploadTimestamp: string;
  imgSrc: string;
  postType: 'regular' | 'popular'; //If popular postType, needs to have reduced width from 350px to 274px (see figma)
};

const PostCard: React.FC<PostCardProps> = ({ avatarSrc, creatorUsername, postDescription, uploadTimestamp, imgSrc, postType }) => (
  <IonCard className="rounded-[1.3rem]">
    {postType === 'popular' && <IonImg src={imgSrc} />}
    <IonCardHeader className={`flex items-center justify-between ${postType === 'popular' && styles.padding}`}>
      <div className="flex flex-row">
        {/* Avatar is not perfectly aligned with text when in popular/carousel */}
        <IonImg className={`object-cover overflow-hidden self-center ${postType === 'regular' ? styles.avatarBig : styles.avatarSmall}`} src={avatarSrc} />
        <div className="ml-2 flex flex-col justify-center">
          <IonCardTitle>
            <h2 className="text-brand-black font-semibold leading-0">{creatorUsername}</h2>
          </IonCardTitle>
          <IonCardSubtitle>
            <h5 className="font-light leading-0">{uploadTimestamp}</h5>
          </IonCardSubtitle>
        </div>
      </div>
      <IonIcon icon={ellipsisHorizontal} color="dark" />
    </IonCardHeader>
    <IonCardContent>
      <h3 className="pb-3 text-brand-black">{postDescription}</h3>
      {postType === 'regular' && <IonImg src={imgSrc} className="rounded-[10px] object-cover overflow-hidden" />}
    </IonCardContent>
  </IonCard>
);
export default PostCard;
