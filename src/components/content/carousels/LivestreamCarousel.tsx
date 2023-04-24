import { Carousel } from 'antd';
import LivestreamCard from '../cards/LivestreamCard';
import livestreamImage from 'static/assets/dummy_image/livestreamImg.png';
import avatar3 from 'static/assets/dummy_image/dummy-data-livestream/independeceweek.png';
import avatar from 'static/assets/dummy_image/dummy-data-livestream/RIMG.png';
import avatar2 from 'static/assets/dummy_image/dummy-data-livestream/sr4.png';
import livestreamImage2 from 'static/assets/dummy_image/dummy-data-livestream/posta.png';
import livestreamImage3 from 'static/assets/dummy_image/dummy-data-livestream/bg2.png';

const LiveStreamCarousel: React.FC = () => {
  return (
    <Carousel dots={false} draggable>
      {livestreams.map((data, index) => {
        return (
          <LivestreamCard
            key={index}
            imgSrc={data.livestreamImage}
            avatarSrc={data.avatar}
            creatorUsername={data.username}
            livestreamDescription={data.description}
            uploadTimestamp={data.uploaded}
            postType={'popular'}
            isCreatorLive={data.isCreatorLive}
          />
        );
      })}
    </Carousel>
  );
};

const livestreams = [
  {
    avatar: avatar,
    username: 'Jesper A. Hansen',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
    uploaded: '3 hour ago',
    livestreamImage: livestreamImage2,
    isCreatorLive: true,
  },
  // {
  //   avatar: avatar,
  //   username: 'Karsten Larsen',
  //   description:
  //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
  //   uploaded: '1 hour ago',
  //   livestreamImage: livestreamImage2,
  //   isCreatorLive: false,
  // },
  {
    avatar: avatar2,
    username: 'Mads Andersen',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
    uploaded: '1 hour ago',
    livestreamImage: livestreamImage3,
    isCreatorLive: true,
  },
  {
    avatar: avatar3,
    username: 'Abdo MeeW',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
    uploaded: '0 hour ago',
    livestreamImage: livestreamImage,
    isCreatorLive: true,
  },
];

export default LiveStreamCarousel;
