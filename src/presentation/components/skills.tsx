import { CourseContext } from '@/pages/_app';
import React, { useContext } from 'react';

export default function Skills() {
  const [store] = useContext(CourseContext)!;

  return <div>{React.Children.toArray(store.skills.map((s) => <h1>{s.name}</h1>))}</div>;

}
