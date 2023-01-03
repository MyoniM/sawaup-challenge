import React, { useContext, useState, useMemo, memo } from 'react';

import { useQuery } from 'react-query';

import { Course } from '@/domain/models';
import { CourseContext } from '@/pages/_app';

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

  return <div>{React.Children.toArray(filteredCourses.map((course) => <h1>{course.name}</h1>))}</div>;
});

export default Courses;
