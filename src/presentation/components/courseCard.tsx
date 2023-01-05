import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';

import styles from '@/presentation/styles/courseCard.module.css';
import YouTubeLazyLoad from './youtubeLazyLoad';
import { useMutation, useQueryClient } from 'react-query';
import { Course } from '@/domain/models';
import { RemoteFavoriteCourse } from '@/data/usecases/course/remote-favorite-course';

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
      // When mutate is called:
      onMutate: async (newCourse: Course) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries(['courses', newCourse.id]);

        // Snapshot the previous value
        const previousCourses = queryClient.getQueryData(['courses', newCourse.id]) as any;

        // Optimistically update to the new value
        queryClient.setQueryData(['courses', newCourse.id], newCourse);

        // Return a context with the previous and new todo
        return { previousCourses, newCourse };
      },
      // If the mutation fails, use the context we returned above
      onError: (_err, _variables, context) => {
        if (context?.previousCourses) {
          queryClient.setQueryData<Course>(['courses', context.newCourse.id], context.previousCourses);
        }
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ['courses'] });
      },
    }
  );

  const videoId = course.video_url.split('?v=')[1];
  return (
    <div className={styles.cardWrapper}>
      <Card sx={{ maxWidth: 275 }}>
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
