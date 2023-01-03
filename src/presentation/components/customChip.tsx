import React from 'react';
import Chip from '@mui/material/Chip';

const handleClick = () => {
  console.info('You clicked the Chip.');
};

export interface IProps {
  name: string;
}

export default function CustomChip({ name }: IProps) {
  return <Chip label={name} onClick={handleClick} />;
}
