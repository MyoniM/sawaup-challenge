import React, { memo } from 'react';
import Head from 'next/head';

import Grid from '@mui/material/Grid';

import { GetCourses } from '@/infrastructure/services/coursesStorage';
import { GetSkills } from '@/infrastructure/services/skillStorage';

import { Course, Skill } from '@/domain/models';

import Skills from '@/presentation/components/skills';
import Courses from '@/presentation/components/courses';


export async function getServerSideProps() {
  const getCourses = new GetCourses();
  const getSkills = new GetSkills();
  const data = {
    courses: await getCourses.getAll({ user_id: 'testUser' }),
    skills: await getSkills.getAll({ user_id: 'testUser' }),
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
          <Skills skills={props.data.skills} />
        </Grid>
        <Grid item xs={10}>
          <Courses courses={props.data.courses} />
        </Grid>
      </Grid>
    </>
  );
});

export default Home;
