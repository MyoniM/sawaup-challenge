import React, { useContext, useState, useMemo, memo } from 'react';

import { useQuery } from 'react-query';

import { Course } from '@/domain/models';
import { CourseContext } from '@/pages/_app';
import CourseCard from './courseCard';

import styles from '@/presentation/styles/courses.module.css';

const getCourses = async (): Promise<Course[]> => {
  const res = await fetch('http://localhost:3000/api/getCourses');
  return await res.json();
};

interface IProps {
  courses: Course[];
}

const Courses = memo(function Courses({ courses }: IProps) {
  const [store] = useContext(CourseContext)!;

  const { data } = useQuery('courses', getCourses, {
    initialData: courses,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const [filters, setFilters] = useState([]);

  const filteredCourses = useMemo(() => data!.filter((c) => true), [filters, courses]);

  return (
    <div className={styles.coursesWrapper}>
      <div>
        <h3>Selected courses</h3>
        <div className={styles.availableCoursesWrapper}>
          {React.Children.toArray(filteredCourses.map((c) => <CourseCard name={c.name} url={c.video_url} isFavorite={c.isFavorite} />))}
        </div>
      </div>
      <div>
        <h3>Available courses</h3>
        <div className={styles.availableCoursesWrapper}>
          {React.Children.toArray(filteredCourses.map((c) => <CourseCard name={c.name} url={c.video_url} isFavorite={c.isFavorite} />))}
        </div>
      </div>
    </div>
  );
});

export default Courses;
