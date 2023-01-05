import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';

import styles from '@/presentation/styles/courseCard.module.css';
import YouTubeLazyLoad from './youtubeLazyLoad';

export interface IProps {
  name: string;
  url: string;
  isFavorite: boolean;
}

export default function CourseCard({ name, url, isFavorite }: IProps) {
  const videoId = url.split('?v=')[1];
  return (
    <div className={styles.cardWrapper}>
      <Card sx={{ maxWidth: 275 }}>
        <IconButton aria-label="add to favorites" className={styles.favIco}>
          ♥
        </IconButton>
        <YouTubeLazyLoad youtubeID={videoId} title={'Asdasfsdf'} />
        <CardHeader title={name} />
      </Card>
    </div>
  );
}
