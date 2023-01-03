import React, { useContext, memo, useEffect } from 'react';
import Head from 'next/head';

import { Course, Skill } from '@/domain/models';

import Skills from '@/presentation/components/skills';
import Courses from '@/presentation/components/courses';
import { CourseContext } from './_app';

import Switch from '@mui/material/Switch';
const label = { inputProps: { "aria-label": "Switch demo" } };

const getCourses = async (): Promise<Course[]> => {
  const res = await fetch('http://localhost:3000/api/getCourses');
  return await res.json();
};

const getSkills = async (): Promise<Course[]> => {
  const res = await fetch('http://localhost:3000/api/getCourses');
  return await res.json();
};

export async function getServerSideProps() {
  const data = {
    courses: await getCourses(),
    skills: [
      {
        id: '123',
        name: 'Office',
        isSelected: true,
      },
      {
        id: '124',
        name: 'Computer',
        isSelected: false,
      },
    ],
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
      <Switch {...label} defaultChecked />

      <Skills />
      <Courses courses={props.data.courses} />
    </>
  );
});

export default Home;
