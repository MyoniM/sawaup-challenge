import React from 'react';

import Chip from '@mui/material/Chip';

import { Skill } from '@/domain/models';

export interface IProps {
  skill: Skill;
  handleSelect: (skillId: number) => void;
}

export default function CustomChip({ skill, handleSelect }: IProps) {
  return <Chip label={skill.name} color={skill.isSelected ? 'primary' : 'default'} onClick={() => handleSelect(skill.id)} />;
}
