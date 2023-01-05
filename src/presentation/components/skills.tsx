import React, { memo } from 'react';

import { useMutation, useQuery, useQueryClient } from 'react-query';

import { Skill } from '@/domain/models';
import { RemoteSelectSkill } from '@/data/usecases/skill/remote-select-skill';
import { RemoteGetSkill } from '@/data/usecases/skill/remote-get-skill';

import CustomChip from './customChip';
import styles from '@/presentation/styles/skills.module.css';

interface IProps {
  skills: Skill[];
}

const Skills = memo(function Skills({ skills }: IProps) {
  const queryClient = useQueryClient();

  const remoteGetSkills = new RemoteGetSkill().getAll;
  const remoteSelectSkill = new RemoteSelectSkill().select;

  const { data } = useQuery('skills', () => remoteGetSkills({ user_id: 'testUser' }), {
    initialData: skills,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const mutation = useMutation(
    (newSkill: Skill) =>
      remoteSelectSkill({
        user_id: 'testUser',
        skill_id: newSkill.id,
        select: !newSkill.isSelected,
      }),
    {
      // Always refetch after error or success:
      onSettled: async () => {
        await queryClient.invalidateQueries('skills');
        await queryClient.invalidateQueries('courses');
      },
    }
  );

  const selectedSkills: Skill[] = [];
  const availableSkills: Skill[] = [];

  data?.forEach((s) => {
    if (s.isSelected) selectedSkills.push(s);
    else availableSkills.push(s);
  });

  const handleSelect = (skillId: number) => {
    const skills = queryClient.getQueryData('skills') as Skill[];

    const selectedSkillsCount = skills.filter((s) => s.isSelected).length;

    const skillIdx = skills.findIndex((s) => s.id === skillId);
    if (selectedSkillsCount === 10 && !skills[skillIdx].isSelected) return;
    if (selectedSkillsCount <= 2 && skills[skillIdx].isSelected) return;

    mutation.mutate(skills[skillIdx]);
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
