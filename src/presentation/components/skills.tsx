import React, { useContext, memo } from 'react';

import { useQueryClient } from 'react-query';
import { CourseContext } from '@/pages/_app';
import { Skill } from '@/domain/models';
import CustomChip from './customChip';

import styles from '@/presentation/styles/skills.module.css';

const Skills = memo(function Skills() {
  const queryClient = useQueryClient();
  console.log(queryClient.getQueryData('courses'));

  const [store, setStore] = useContext(CourseContext)!;

  const selectedSkills: Skill[] = [];
  const availableSkills: Skill[] = [];

  store.skills.forEach((s) => {
    if (s.isSelected) selectedSkills.push(s);
    else availableSkills.push(s);
  });

  const handleSelect = (skillId: number) => {
    const skills = store.skills;
    const selectedSkillsCount = skills.filter((s) => s.isSelected).length;

    const skillIdx = skills.findIndex((s) => s.id === skillId);
    if (selectedSkillsCount === 10 && !skills[skillIdx].isSelected) return;
    if (selectedSkillsCount <= 2 && skills[skillIdx].isSelected) return;

    skills[skillIdx].isSelected = !skills[skillIdx].isSelected;

    setStore({ skills });
  };

  return (
    <div className={styles.skillsWrapper}>
      <div>
        <h3>Selected Skills</h3>
        <div className={styles.skillChipWrapper}>
          {React.Children.toArray(
            selectedSkills.map((s) => {
              return <CustomChip skill={s} handleSelect={handleSelect} />;
            })
          )}
        </div>
      </div>
      <div>
        <h3>Available Skills</h3>
        <div className={styles.skillChipWrapper}>
          {React.Children.toArray(
            availableSkills.map((s) => {
              return <CustomChip skill={s} handleSelect={handleSelect} />;
            })
          )}
        </div>
      </div>
    </div>
  );
});

export default Skills;
