import React from 'react';

import styles from '@/presentation/styles/emptyCourseList.module.css';

export default function EmptyCourseList() {
  return (
    <div className={styles.wrapper}>
      <h1>No skills selected</h1>
      <p>Courses will appear here based on your skills</p>
    </div>
  );
}
