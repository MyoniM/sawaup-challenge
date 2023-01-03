import React, { useContext, memo } from 'react';

import { CourseContext } from '@/pages/_app';
import Stack from '@mui/material/Stack';
import { Skill } from '@/domain/models';
import CustomChip from './CustomChip';

const Skills = memo(function Skills() {
  const [store, setStore] = useContext(CourseContext)!;

  const selectedSkills: Skill[] = [];
  const availableSkills: Skill[] = [];

  store.skills.forEach((s) => {
    if (s.isSelected) selectedSkills.push(s);
    else availableSkills.push(s);
  });

  return (
    <div style={{ height: 'calc(100vh - 75px)', padding: 10, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <h3>Selected Skills</h3>
        <Stack direction="row" spacing={1}>
          {React.Children.toArray(
            selectedSkills.map((s) => {
              return <CustomChip name={s.name} />;
            })
          )}
        </Stack>
      </div>
      <div>
        <h3>Available Skills</h3>
        <Stack direction="row" spacing={1}>
          {React.Children.toArray(
            availableSkills.map((s) => {
              return <CustomChip name={s.name} />;
            })
          )}
        </Stack>
      </div>
    </div>
  );
});

export default Skills;
