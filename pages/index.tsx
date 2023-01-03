import React from 'react';
import Head from 'next/head';
import { useState, useMemo } from 'react';

import { useQuery } from 'react-query';
import { Courses } from '../interfaces';

const getCourses = async (): Promise<Courses[]> => {
  const res = await fetch('http://localhost:3000/api/getCourses');
  return await res.json();
};

export async function getServerSideProps() {
  return {
    props: {
      courses: await getCourses(),
    },
  };
}

export default function Home(props: { courses: Courses[] }) {
  const { data: courses } = useQuery('courses', getCourses, {
    initialData: props.courses,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const [filters, setFilters] = useState([]);

  const filteredCourses = useMemo(() => courses!.filter((c) => true), [filters, courses]);
  console.log(filteredCourses);

  return (
    <>
      <Head>
        <title>SawaUp</title>
        <meta name="description" content="SawaUp challenge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {React.Children.toArray(filteredCourses.map((course) => <h1>{course.name}</h1>))}
    </>
  );
}
