import React, { useContext, useState, useMemo, memo } from 'react';

import { useQuery } from 'react-query';

import { Course } from '@/domain/models';
import { CourseContext } from '@/pages/_app';
import CourseCard from './courseCard';

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

  const filteredCourses = useMemo(() => courses!.filter((c) => true), [filters, courses]);

  return (
    <div style={{ height: 'calc(100vh - 65px)', padding: 20, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex' }}>
        {React.Children.toArray(filteredCourses.map((c) => <CourseCard name={c.name} url={c.url} isFavorite={c.isFavorite} />))}
      </div>
    </div>
  );
});

export default Courses;
