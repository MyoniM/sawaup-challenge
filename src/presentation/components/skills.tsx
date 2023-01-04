import React, { useContext, memo } from 'react';

import { CourseContext } from '@/pages/_app';
import Stack from '@mui/material/Stack';
import { Skill } from '@/domain/models';
import CustomChip from './customChip';

import styles from '@/presentation/styles/skills.module.css';

const Skills = memo(function Skills() {
  const [store, setStore] = useContext(CourseContext)!;

  const selectedSkills: Skill[] = [];
  const availableSkills: Skill[] = [];

  store.skills.forEach((s) => {
    if (s.isSelected) selectedSkills.push(s);
    else availableSkills.push(s);
  });

  return (
    <div className={styles.skillsWrapper}>
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
        <div className={styles.skillChipWrapper}>
          {React.Children.toArray(
            availableSkills.map((s) => {
              return <CustomChip name={s.name} />;
            })
          )}
        </div>
      </div>
    </div>
  );
});

export default Skills;
