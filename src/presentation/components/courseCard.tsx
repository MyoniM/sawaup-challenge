import React from 'react';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';

import { useMutation, useQueryClient } from 'react-query';

import { RemoteFavoriteCourse } from '@/data/usecases/course/remote-favorite-course';
import { Course } from '@/domain/models';

import YouTubeLazyLoad from './youtubeLazyLoad';

import styles from '@/presentation/styles/courseCard.module.css';

export interface IProps {
  course: Course;
}

export default function CourseCard({ course }: IProps) {
  const remoteFavCourse = new RemoteFavoriteCourse().favorite;

  const queryClient = useQueryClient();
  const mutation = useMutation(
    (newCourse: Course) =>
      remoteFavCourse({
        user_id: 'testUser',
        course_id: newCourse.id,
        favorite: !newCourse.isFavorite,
      }),
    {
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries('courses');
      },
    }
  );

  const videoId = course.video_url.split('?v=')[1];
  return (
    <div className={styles.cardWrapper}>
      <Card sx={{ maxWidth: 384 }}>
        <IconButton
          aria-label="add to favorites"
          className={styles.favIco}
          onClick={() => {
            mutation.mutate(course);
          }}
          style={{ color: course.isFavorite ? 'red' : 'grey' }}
        >
          ♥
        </IconButton>
        <YouTubeLazyLoad youtubeID={videoId} title={'Asdasfsdf'} />
        <CardHeader title={course.name} />
      </Card>
    </div>
  );
}
