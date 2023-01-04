import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';

import YouTube, { YouTubeProps } from 'react-youtube';

import styles from '@/presentation/styles/courseCard.module.css';

export interface IProps {
  name: string;
  url: string;
  isFavorite: boolean;
}

export default function CourseCard({ name, url, isFavorite }: IProps) {
  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    event.target.pauseVideo();
  };

  const opts: YouTubeProps['opts'] = {
    height: '200',
    width: '275',
    playerVars: {
      autoplay: 0,
    },
  };
  const videoId = url.split("?v=")[1]
  return (
    <div className={styles.cardWrapper}>
      <Card sx={{ maxWidth: 275 }}>
        <IconButton aria-label="add to favorites" className={styles.favIco}>
          ♥
        </IconButton>
        <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} />
        <CardHeader title={name} />
      </Card>
    </div>
  );
}
