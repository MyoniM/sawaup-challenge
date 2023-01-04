import React, { useContext, memo, useEffect } from 'react';
import Head from 'next/head';

import { Course, Skill } from '@/domain/models';

import Skills from '@/presentation/components/skills';
import Courses from '@/presentation/components/courses';
import { CourseContext } from './_app';

import Grid from '@mui/material/Grid';

const getCourses = async (): Promise<any> => {
  const res = await fetch('http://localhost:3000/api/course/getAll', {
    method: 'POST',
    body: JSON.stringify({
      user_id: 'testuser',
    }),
  });
  return await res.json();
};

const getSkills = async (): Promise<Course[]> => {
  const res = await fetch('http://localhost:3000/api/skill/getAll', {
    method: 'POST',
    body: JSON.stringify({
      user_id: 'testuser',
    }),
  });
  return await res.json();
};

export async function getServerSideProps() {
  const data = {
    courses: await getCourses(),
    skills: await getSkills(),
  };
  return {
    props: {
      data,
    },
  };
}

interface IProps {
  data: {
    skills: Skill[];
    courses: Course[];
  };
}

const Home = memo(function Hello(props: IProps) {
  const [, setStore] = useContext(CourseContext)!;

  useEffect(() => {
    setStore({ skills: props.data.skills });
  }, [props.data.skills, setStore]);

  return (
    <>
      <Head>
        <title>SawaUp</title>
        <meta name="description" content="SawaUp challenge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Skills />
        </Grid>
        <Grid item xs={10}>
          <Courses courses={props.data.courses} />
        </Grid>
      </Grid>
    </>
  );
});

export default Home;
