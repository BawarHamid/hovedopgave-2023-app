import { IonCardHeader, IonCard, IonCardContent, IonImg, IonIcon, IonCardTitle, IonCardSubtitle } from '@ionic/react';
import { ellipsisHorizontal } from 'ionicons/icons';
import styles from './card.module.css';
import live from 'static/assets/img/live.svg';

type LivestreamCardProps = {
  avatarSrc: string;
  creatorUsername: string;
  livestreamDescription: string;
  uploadTimestamp: string;
  imgSrc: string;
  postType: 'regular' | 'popular';
  isCreatorLive: boolean;
};

const LivestreamCard: React.FC<LivestreamCardProps> = ({
  avatarSrc,
  creatorUsername,
  livestreamDescription,
  uploadTimestamp,
  imgSrc,
  postType,
  isCreatorLive,
}) => (
  <IonCard className="rounded-[1.3rem]">
    {postType === 'popular' && (
      <div>
        {postType === 'popular' && isCreatorLive === true && (
          <div className="absolute ml-3 mt-3">
            <IonImg src={live} />
          </div>
        )}
        <IonImg src={imgSrc} />
      </div>
    )}

    <IonCardHeader className={`flex items-center justify-between ${postType === 'popular' && styles.padding}`}>
      <div className="flex flex-row">
        <div className="flex relative">
          {isCreatorLive === true && postType === 'regular' && (
            <div className="rounded-[0.3125rem] w-14 h-3.5 bg-gradient-to-r from-orange-600 to-red-600 absolute flex self-end justify-center items-center">
              {/* make to svg */}
              <h6 className="text-white font-bold text-[0.5625rem]">LIVE</h6>
            </div>
          )}

          <IonImg
            className={`object-cover overflow-hidden self-center ${postType === 'regular' ? styles.avatarBig : styles.avatarSmall} ${
              isCreatorLive === true && postType === 'regular' && 'border-2 rounded-full border-red-500 border-solid'
            }`}
            src={avatarSrc}
          />
        </div>

        <div className="ml-2 flex flex-col justify-center">
          <IonCardTitle>
            <h2 className="text-brand-black font-semibold">{creatorUsername}</h2>
          </IonCardTitle>
          <IonCardSubtitle>
            <h5 className="font-light">{uploadTimestamp}</h5>
          </IonCardSubtitle>
        </div>
      </div>
      <IonIcon icon={ellipsisHorizontal} color="dark" />
    </IonCardHeader>

    <IonCardContent>
      <h3 className="pb-3 text-brand-black">{livestreamDescription}</h3>
      {postType === 'regular' && <IonImg src={imgSrc} className="rounded-[10px] object-cover overflow-hidden" />}
    </IonCardContent>
  </IonCard>
);
export default LivestreamCard;
