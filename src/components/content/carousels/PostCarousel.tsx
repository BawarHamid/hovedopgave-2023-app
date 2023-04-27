import React from 'react';
import { Carousel } from 'antd';
import PostCard from '../cards/PostCard';
import avatar from 'static/assets/img/Kato.png';
import postImageCarousel from 'static/assets/dummy_image/postpicturecarousel.png';

const PostCarousel: React.FC = () => {
  return (
    <Carousel dots={false}>
      {posts.map((post) => {
        return (
          <PostCard
            key={post.id}
            avatarSrc={post.avatar}
            creatorUsername={post.username}
            postDescription={post.description}
            uploadTimestamp={post.uploaded}
            imgSrc={post.postImage}
            postType={'popular'}
          />
        );
      })}
    </Carousel>
  );
};

const posts = [
  {
    id: 1,
    avatar: avatar,
    username: 'kato',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
    uploaded: '1 hour ago',
    postImage: postImageCarousel,
  },
  {
    id: 2,
    avatar: avatar,
    username: 'kato',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
    uploaded: '1 hour ago',
    postImage: postImageCarousel,
  },
  {
    id: 3,
    avatar: avatar,
    username: 'kato',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
    uploaded: '1 hour ago',
    postImage: postImageCarousel,
  },
  {
    id: 4,
    avatar: avatar,
    username: 'kato',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
    uploaded: '1 hour ago',
    postImage: postImageCarousel,
  },
];

export default PostCarousel;
